import express from "express";
import { getAllBooks, getBookById } from "../controllers/Book.controller.js";
import { verifyAccessToken } from "../middleware/Auth.js";

const bookRoute = express.Router();

bookRoute.get("/getallbooks", getAllBooks);

bookRoute.get("/getbookbyid/:id", verifyAccessToken, getBookById);

export default bookRoute;
