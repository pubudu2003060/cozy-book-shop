import express from "express";
import { login } from "../controllers/Auth.controler.js";
import jwtCheck from "../middleware/jwtCheck.js";

const authRouter = express.Router();

authRouter.post("/login", jwtCheck, login);

export default authRouter;
