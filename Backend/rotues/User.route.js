import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import { deleteAccount, updateProfile } from "../controllers/User.controler.js";
import { checkUser } from "../middleware/checkUser.js";

const userRoute = express.Router();

userRoute.put("/updateprofile", jwtCheck, checkUser, updateProfile);

userRoute.delete("/deleteaccount", jwtCheck, checkUser, deleteAccount);

export default userRoute;
