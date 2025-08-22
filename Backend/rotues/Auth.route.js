import express from "express";
import {
  signupUser,
  signinUser,
  refreshToken,
  googleSignin,
  googleSigninCallBack,
  handleGoogleFailure,
  handleGoogleLogin,
} from "../controllers/Auth.controler.js";
import { verifyAccessToken, verifyRefreshToken } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/signup", signupUser);

userRouter.post("/signin", signinUser);

userRouter.get("/googlesignin", googleSignin);

userRouter.get(
  "/googlesignin/callback",
  googleSigninCallBack,
  handleGoogleLogin
);

userRouter.get("/googlesignin/failure", handleGoogleFailure);

userRouter.get("/refreshaccesstoken", verifyRefreshToken, refreshToken);

export default userRouter;
