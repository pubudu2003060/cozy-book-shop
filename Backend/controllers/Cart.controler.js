import Cart from "../models/Cart.model.js";
import mongoose from "mongoose";

export const addToCart = async (req, res) => {
  try {
    const { bookId } = req.body;
    const user = req.user;
    const cartId = user.cartId;

    const cart = await Cart.findById(cartId);

    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const book = cart.books.find((book) => book.bookId.toString() === bookId);
    if (book) {
      return res.status(400).json({
        status: false,
        message: "Book already exists in the cart",
      });
    }

    cart.books.push({ bookId, quantity: 1 });
    await cart.save();

    res.status(200).json({
      status: true,
      message: "Book added to cart successfully",
    });
  } catch (error) {
    console.error("Error adding book to cart:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const loadCartData = async (req, res) => {
  try {
    const user = req.user;
    const cartId = user.cartId;

    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid cart ID",
      });
    }

    const cartData = await Cart.findById(cartId).populate({
      path: "books.bookId",
      select: "title image auther price",
    });

    if (!cartData) {
      return res.status(404).json({
        status: false,
        message: "Cart data not found",
      });
    }

    return res.status(200).json({
      status: true,
      message: "Cart data found",
      cart: cartData.books,
    });
  } catch (error) {
    console.error("Error fetching cart data:", error.message);
    return res.status(500).json({
      status: false,
      message: "Server error while fetching cart data",
    });
  }
};

export const getCartCount = async (req, res) => {
  try {
    const cartId = req.user.cartId;
    const cart = await Cart.findById(cartId);
    if (!cart) {
      res.status(404).json({
        status: false,
        message: "Cartnot found",
      });
    }

    const cartSIze = cart.books.length;

    res.status(200).json({
      status: true,
      length: cartSIze,
      message: "cart size",
    });
  } catch (error) {
    console.log("Cart length find error: ", error.message);
    res.status(500).json({
      status: false,
      message: "cart length find error",
    });
  }
};

export const updateItemQuantity = async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const cartId = req.user.cartId;

    const cart = await Cart.find({ _id: cartId, "books._id": itemId });
    if (!cart) {
      return res.status(404).json({
        status: false,
        message: "Cart not found",
      });
    }

    const responce = await Cart.findOneAndUpdate(
      { _id: cartId, "books._id": itemId },
      { $set: { "books.$.quantity": quantity } },
      { new: true }
    );

    res
      .status(200)
      .json({ status: true, message: "Item quantity update successfully" });
  } catch (error) {
    console.log("Error in updating cart book item quantity:", error.message);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
