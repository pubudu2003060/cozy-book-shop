import User from "../models/User.model.js";
import { verifyAccess, verifyRefresh } from "../utils/Tokens.js";

export const verifyAccessToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccess(token);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Access Token verification failed:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const verifyRefreshToken = async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  try {
    const decoded = verifyRefresh(token);

    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error("Refresh Token verification failed:", error);
    return res.status(403).json({ message: "Invalid token" });
  }
};
