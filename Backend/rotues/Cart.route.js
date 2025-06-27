import express from "express";
import { addToCart, loadCartData } from "../controllers/Cart.controler.js";
import { verifyAccessToken } from "../middleware/JWT.js";

const cartRoute = express.Router();

cartRoute.post("/addtocart", verifyAccessToken, addToCart);

cartRoute.get("/loadcartdata", verifyAccessToken, loadCartData);

export default cartRoute;
