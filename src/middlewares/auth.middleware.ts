import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../env";

export const requireLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const token = header.split(" ")[1]; // get the bearer token
  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decode = jwt.verify(token, JWT_SECRET!);

  if (!decode) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  req["currentUser"] = decode;

  next();
};
