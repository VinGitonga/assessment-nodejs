import * as express from "express";
import { CustomerController } from "../controllers/customer.controller";
import { requireLogin } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/new", CustomerController.createAccount);
router.get("/balance", requireLogin, CustomerController.getAccountBalance);

export { router as customerRouter };
