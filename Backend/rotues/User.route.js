import express from "express";
import {
  signupUser,
  signinUser,
  refreshToken,
} from "../controllers/User.controler.js";
import {
  googleSignin,
  googleSigninCallBack,
  handleGoogleFailure,
  handleGoogleLogin,
} from "../controllers/GoogleAuth.controler.js";
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
