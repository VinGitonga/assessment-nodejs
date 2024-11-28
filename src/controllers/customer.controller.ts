import { Request, Response } from "express";
import { Customer } from "../entities/customer.entity";
import { AppEncryptionHashing } from "../helpers";
import { AppDataSource } from "../data-source";

export class CustomerController {
  static async createAccount(req: Request, res: Response): Promise<any> {
    try {
      const { name, phoneNo, password } = req.body;

      if (!name || !phoneNo || !password) {
        return res.status(400).json({
          success: false,
          msg: "Name, Phone No and Password are required",
        });
      }

      const hashedPassword = await AppEncryptionHashing.hashPassword(password);
      const newCustomer = new Customer();
      newCustomer.name = name;
      newCustomer.phoneNo = phoneNo;
      newCustomer.password = hashedPassword;

      const customerRepo = AppDataSource.getRepository(Customer);

      await customerRepo.save(newCustomer);

      return res
        .status(200)
        .json({ success: true, msg: "Account created successfully" });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: err?.message ?? "Something went wrong" });
    }
  }

  static async getAccountBalance(req: Request, res: Response): Promise<any> {
    try {
      const customerRepo = AppDataSource.getRepository(Customer);

      const phoneNo = req["currentUser"].phoneNo;

      const foundCustomer = await customerRepo.findOne({ where: { phoneNo } });

      if (!foundCustomer) {
        return res
          .status(400)
          .json({ success: false, msg: "Account No found" });
      }

      return res
        .status(200)
        .json({ success: true, data: foundCustomer.balance });
    } catch (err) {
      return res
        .status(400)
        .json({ success: false, msg: err?.message ?? "Something went wrong" });
    }
  }
}
