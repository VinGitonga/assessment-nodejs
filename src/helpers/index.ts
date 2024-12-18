import * as bcrypt from "bcrypt";
import { IAppJWTPayload } from "../types/Payload";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export class AppEncryptionHashing {
  static async hashPassword(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  static async comparePassword(hashedPassword: string, password: string) {
    if(!hashedPassword || password){
      return false
    }
    return bcrypt.compareSync(password, hashedPassword);
  }

  static generateToken(payload: IAppJWTPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  }
}
