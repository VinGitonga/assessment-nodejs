import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Customer } from "../entities/customer.entity";
import { AppEncryptionHashing } from "../helpers";

export class AuthController {
  static async login(req: Request, res: Response): Promise<any> {
    try {
      const { phoneNo, password } = req.body;

      if (!phoneNo || !password) {
        return res
          .status(400)
          .json({ success: false, msg: "Phone and Password are required" });
      }

      const customerRepo = AppDataSource.getRepository(Customer);

      const foundCustomer = await customerRepo.findOne({ where: { phoneNo } });

      console.log('found', foundCustomer)

      const isPasswordValid = AppEncryptionHashing.comparePassword(
        foundCustomer?.password,
        password
      );

      if (!foundCustomer || !isPasswordValid) {
        return res
          .status(400)
          .json({ success: false, msg: "Invalid phone no or password" });
      }

      const token = AppEncryptionHashing.generateToken({
        id: foundCustomer.id,
        phoneNo: foundCustomer.phoneNo,
      });

      return res
        .status(200)
        .json({
          success: true,
          msg: "Authenticated successfully",
          data: { user: { ...foundCustomer, password: null }, token },
        });
    } catch (err) {
      console.log('err', err)
      return res.status(400).json({success: false, msg: "Invalid phone no or password"})
    }
  }
}
