import * as express from "express";
import { AuthController } from "src/controllers/auth.controller";

const router = express.Router();

router.post("/login", AuthController.login);

export { router as authRouter };