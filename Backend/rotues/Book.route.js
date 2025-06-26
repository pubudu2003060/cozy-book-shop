import express from "express";
import { getAllBooks } from "../controllers/Book.controller.js";

const bookRoute = express.Router();

bookRoute.get("/getallbooks", getAllBooks);

export default bookRoute;
