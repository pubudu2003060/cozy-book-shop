import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./configs/DBConnection.js";
import bookRoute from "./rotues/Book.route.js";
import cartRoute from "./rotues/Cart.route.js";
import emailRouter from "./rotues/Email.route.js";
import userRoute from "./rotues/User.route.js";
import authRouter from "./rotues/Auth.route.js";
import startHTTPSServer from "./configs/HttpsServer.js";
import orderRoute from "./rotues/Order.route.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: ["https://localhost:5173", "https://cozybookshop.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/auth", authRouter);

app.use("/api/book", bookRoute);

app.use("/api/cart", cartRoute);

app.use("/api/email", emailRouter);

app.use("/api/user", userRoute);

app.use("/api/order", orderRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

startHTTPSServer(app, PORT, connectDb);
