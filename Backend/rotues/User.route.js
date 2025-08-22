import express from "express";
import { verifyAccessToken } from "../middleware/auth.js";
import { isLoged } from "../controllers/User.controler.js";

const userRoute = express.Router();

userRoute.get("/isloged", verifyAccessToken, isLoged);

export default userRoute;
