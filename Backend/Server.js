import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./configs/DBConnection.js";
import userRouter from "./rotues/User.route.js";
import bookRoute from "./rotues/Book.route.js";

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

app.use("/api/user", userRouter);

app.use("/api/book", bookRoute);

app.listen(PORT, async () => {
  await connectDb();
  console.log("Server is running on http://localhost:" + PORT);
});
