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

    if (!user) {
      res.redirect(`http://localhost:5173/signin?status=fail`);
    }

    const accessToken = signAccessToken(user._id.toString());
    const refreshToken = signRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.redirect(
      `http://localhost:5173/signin?status=success&&accessToken=${accessToken}`
    );
  } catch (error) {
    console.log("Google login error: " + error.message);
    res.redirect(`http://localhost:5173/signin?status=fail`);
  }
};

export const handleGoogleFailure = async (req, res) => {
  res.redirect(`http://localhost:5173/signin?status=fail`);
};
