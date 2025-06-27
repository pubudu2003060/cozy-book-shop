import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Cart from "../models/Cart.model.js";

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUSer = await User.findOne({ email });
    if (existingUSer) {
      return res
        .status(400)
        .json({ status: false, message: "User already exists" });
    }

    const newPassword = await bcrypt.hash(password, 10);

    const newCart = new Cart();
    await newCart.save();

    const newUser = new User({
      name,
      email,
      password: newPassword,
      cartId: newCart._id,
    });

    await newUser.save();

    const accessToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.status(201).json({
      status: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Error in signupUser:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

export const signinUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUSer = await User.findOne({ email });
    if (!existingUSer) {
      return res
        .status(400)
        .json({ status: false, message: "User dont exists" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUSer.password
    );

    if (!isPasswordValid) {
      res.status(400).json({ status: false, message: "Invalid password" });
      return;
    }

    const accessToken = jwt.sign(
      { id: existingUSer._id },
      process.env.JWT_SECRET
    );

    res.status(201).json({
      status: true,
      message: "User signIn successfully",
      accessToken,
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
