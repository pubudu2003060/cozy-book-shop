import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./configs/DBConnection.js";
import bookRoute from "./rotues/Book.route.js";
import cartRoute from "./rotues/Cart.route.js";
import cookieParser from "cookie-parser";
import passport from "./configs/Passport.js";
import session from "express-session";
import emailRouter from "./rotues/Email.route.js";
import userRoute from "./rotues/User.route.js";
import authRouter from "./rotues/Auth.route.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(
  session({
    secret: "throwaway-passport-bridge",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.COOKIE_SECURE === "true",
      sameSite: "lax",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRouter);

app.use("/api/book", bookRoute);

app.use("/api/cart", cartRoute);

app.use("/api/email", emailRouter);

app.use("/api/user", userRoute);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

app.listen(PORT, async () => {
  await connectDb();
  console.log("Server is running on http://localhost:" + PORT);
});
