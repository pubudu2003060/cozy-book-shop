import express from "express";
import {
  addToCart,
  loadCartData,
  getCartCount,
  updateItemQuantity,
  removeItemFromCart,
} from "../controllers/Cart.controler.js";
import jwtCheck from "../middleware/jwtCheck.js";
import { checkUser } from "../middleware/checkUser.js";

const cartRoute = express.Router();

cartRoute.post("/addtocart", jwtCheck, checkUser, addToCart);

cartRoute.get("/loadcartdata", jwtCheck, checkUser, loadCartData);

cartRoute.get("/getcartsize", jwtCheck, checkUser, getCartCount);

cartRoute.put(
  "/updatecartitemquantity",
  jwtCheck,
  checkUser,
  updateItemQuantity
);

cartRoute.delete(
  "/removeitemfromcart",
  jwtCheck,
  checkUser,
  removeItemFromCart
);

export default cartRoute;
