import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./configs/DBConnection.js";
import bookRoute from "./rotues/Book.route.js";
import cartRoute from "./rotues/Cart.route.js";
import cookieParser from "cookie-parser";
import emailRouter from "./rotues/Email.route.js";
import userRoute from "./rotues/User.route.js";
import authRouter from "./rotues/Auth.route.js";
import startHTTPSServer from "./configs/HttpsServer.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

app.use("/api/book", bookRoute);

app.use("/api/cart", cartRoute);

app.use("/api/email", emailRouter);

app.use("/api/user", userRoute);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Server error" });
});

const PORT = process.env.PORT || 5000;

startHTTPSServer(app, PORT, connectDb);
