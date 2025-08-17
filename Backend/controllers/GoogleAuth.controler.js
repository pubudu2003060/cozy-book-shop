import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import passport from "../configs/Passport.js";
import { signAccessToken, signRefreshToken } from "../utils/Tokens.js";

export const googleSignin = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleSigninCallBack = passport.authenticate("google", {
  failureRedirect: "/api/user/googlesignin/failure",
});

export const handleGoogleLogin = async (req, res) => {
  try {
    const user = req.user;
    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `http://localhost:5173/auth/success?accessToken=${accessToken}`
    );
  } catch (error) {
    console.log("Google login error: " + error.message);
    res.status(500).json({
      status: true,
      message: "Internal server error",
    });
  }
};

export const handleGoogleFailure = async (req, res) => {
  res.status(500).json({
    status: true,
    message: "Google login failed",
  });
};
