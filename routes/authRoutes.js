import {Router} from "express";
import { loginUser, registerUser, verifyUser } from "../controllers/authController.js";

const authRouter = Router();
const addressRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/register/otp-verification", verifyUser);
authRouter.post("/login", loginUser);
addressRouter.post("/address")
export default authRouter;