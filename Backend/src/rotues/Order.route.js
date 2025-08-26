import express from "express";
import jwtCheck from "../middleware/jwtCheck.js";
import { checkUser } from "../middleware/checkUser.js";
import {
  cancelOrder,
  getOrders,
  makeOrder,
} from "../controllers/Order.controler.js";

const orderRoute = express.Router();

orderRoute.post("/createorder", jwtCheck, checkUser, makeOrder);

orderRoute.get("/getorders", jwtCheck, checkUser, getOrders);

orderRoute.patch("/cancelorder/:orderId", jwtCheck, checkUser, cancelOrder);

export default orderRoute;
