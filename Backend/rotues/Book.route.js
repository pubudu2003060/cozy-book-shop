import express from "express";
import { getAllBooks, getBookById } from "../controllers/Book.controller.js";

const bookRoute = express.Router();

bookRoute.get("/getallbooks", getAllBooks);

bookRoute.get("/getbookbyid/:id", getBookById);

export default bookRoute;
