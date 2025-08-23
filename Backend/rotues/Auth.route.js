import express from "express";
import {
  signupUser,
  signinUser,
  refreshToken,
} from "../controllers/Auth.controler.js";
import { verifyRefreshToken } from "../middleware/auth.js";

const authRouter = express.Router();

authRouter.post("/signup", signupUser);

authRouter.post("/signin", signinUser);

authRouter.get("/refreshaccesstoken", verifyRefreshToken, refreshToken);

export default authRouter;
