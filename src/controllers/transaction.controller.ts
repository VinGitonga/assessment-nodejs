import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Transaction, TransactionType } from "../entities/transaction.entity";
import { mockB2c } from "../utils/mock-mpesa";
import { Customer } from "../entities/customer.entity";

export class TransactionController {
  static async depositAmount(req: Request, res: Response): Promise<any> {
    try {
      const phoneNo = req["currentUser"].phoneNo; // get phoneNo from the session
      const amount = req.body.amount;

      if (!amount) {
        return res
          .status(400)
          .json({ success: false, msg: "Amount is required" });
      }

      const mockTransaction = mockB2c(Number(amount) ?? 0);

      const customerRepo = AppDataSource.getRepository(Customer);

      const transactionRepo = AppDataSource.getRepository(Transaction);

      const customerItem = await customerRepo.findOne({ where: { phoneNo } });

      const newTrans = new Transaction();
      newTrans.transactionMetadata = mockTransaction;
      newTrans.amount = Number(amount) ?? 0;
      newTrans.transactionId = mockTransaction.Result.TransactionID;
      newTrans.originatorConversationId =
        mockTransaction.Result.OriginatorConversationID;
      newTrans.conversationId = mockTransaction.Result.ConversationID;
      newTrans.customer = customerItem;
      newTrans.type = TransactionType.DEPOSIT;

      const savedTrans = await transactionRepo.save(newTrans);

      // update customer bal

      await customerRepo.update(
        { id: customerItem.id },
        { balance: Number(customerItem.balance) + (Number(amount) ?? 0) }
      );

      return res.status(200).json({ success: true, data: savedTrans });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Something went wrong" });
    }
  }

  static async getMyTransactions(req: Request, res: Response): Promise<any> {
    const phoneNo = req["currentUser"].phoneNo;

    try {
      const transactionRepo = AppDataSource.getRepository(Transaction);

      const transactions = transactionRepo.find({
        where: { customer: { phoneNo } },
      });

      return res.status(200).json({ success: true, data: transactions });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Something went wrong" });
    }
  }

  static async transferFunds(req: Request, res: Response): Promise<any> {
    const currentPhoneNo = req["currentUser"].phoneNo;

    const toPhoneNo = req.body.phoneNo;
    const amount = req.body.amount;

    if (!toPhoneNo || amount) {
      return res
        .status(400)
        .json({ success: false, msg: "Phone no and amount are required" });
    }

    try {
      const customerRepo = AppDataSource.getRepository(Customer);
      const transactionRepo = AppDataSource.getRepository(Transaction);

      const toAccount = await customerRepo.findOne({
        where: { phoneNo: toPhoneNo },
      });

      if (!toAccount) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid phone no" });
      }

      const currentAccount = await customerRepo.findOne({
        where: { phoneNo: currentPhoneNo },
      });

      if (currentAccount.balance < (Number(amount) ?? 0)) {
        return res
          .status(400)
          .json({ success: false, msg: "Insufficient balance" });
      }

      const mockTransaction = mockB2c(Number(amount) ?? 0);

      const newTrans = new Transaction();
      newTrans.transactionMetadata = mockTransaction;
      newTrans.amount = Number(amount) ?? 0;
      newTrans.transactionId = mockTransaction.Result.TransactionID;
      newTrans.originatorConversationId =
        mockTransaction.Result.OriginatorConversationID;
      newTrans.conversationId = mockTransaction.Result.ConversationID;
      newTrans.customer = currentAccount;
      newTrans.type = TransactionType.TRANSFER;

      const savedTrans = await transactionRepo.save(newTrans);

      const toTrans = new Transaction();
      toTrans.transactionMetadata = mockTransaction;
      toTrans.amount = Number(amount) ?? 0;
      toTrans.transactionId = mockTransaction.Result.TransactionID;
      toTrans.originatorConversationId =
        mockTransaction.Result.OriginatorConversationID;
      toTrans.conversationId = mockTransaction.Result.ConversationID;
      toTrans.customer = currentAccount;
      toTrans.type = TransactionType.DEPOSIT;

      const updateCurrentAccResult = await customerRepo.update(
        { id: currentAccount.id },
        { balance: Number(currentAccount.balance) - (Number(amount) ?? 0) }
      );

      const updatedToAcc = await customerRepo.update(
        { id: currentAccount.id },
        { balance: Number(toAccount.balance) + (Number(amount) ?? 0) }
      );

      return res
        .status(200)
        .json({ success: true, msg: "Transaction is successful" });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: "Something went wrong" });
    }
  }
}
