import express from "express";
import {
  addToCart,
  loadCartData,
  getCartCount,
  updateItemQuantity,
} from "../controllers/Cart.controler.js";
import { verifyAccessToken } from "../middleware/Auth.js";

const cartRoute = express.Router();

cartRoute.post("/addtocart", verifyAccessToken, addToCart);

cartRoute.get("/loadcartdata", verifyAccessToken, loadCartData);

cartRoute.get("/getcartsize", verifyAccessToken, getCartCount);

cartRoute.put("/updatecartitemquantity", verifyAccessToken, updateItemQuantity);

export default cartRoute;
