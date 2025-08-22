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

const authRouter = express.Router();

authRouter.post("/signup", signupUser);

authRouter.post("/signin", signinUser);

authRouter.get("/googlesignin", googleSignin);

authRouter.get(
  "/googlesignin/callback",
  googleSigninCallBack,
  handleGoogleLogin
);

authRouter.get("/googlesignin/failure", handleGoogleFailure);

authRouter.get("/refreshaccesstoken", verifyRefreshToken, refreshToken);

export default authRouter;
