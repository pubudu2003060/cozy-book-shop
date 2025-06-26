import express from "express";
import dotenv from "dotenv";
import cors from "cors";

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

app.get("/callapi", (req, res) => {
  res.status(200).json({
    status: true,
    message: "Backend is called successfully",
  });
});

app.listen(PORT, () => {
  console.log("Server is running on http://localhost:" + PORT);
});
