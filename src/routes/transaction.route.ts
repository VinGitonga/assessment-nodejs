import * as express from "express";
import { requireLogin } from "../middlewares/auth.middleware";
import { TransactionController } from "../controllers/transaction.controller";

const router = express.Router();

router.post(
  "/deposit-funds",
  requireLogin,
  TransactionController.depositAmount
);
router.get(
  "/my-transactions",
  requireLogin,
  TransactionController.getMyTransactions
);

router.post(
  "/transfer-funds",
  requireLogin,
  TransactionController.transferFunds
);

export { router as transactionRouter };
