import {Router} from "express";
import { registerUser } from "../controllers/authController.js";

const authRouter = Router();
const addressRouter = Router();

authRouter.post("/register", registerUser);
addressRouter.post("/address")
export default authRouter;