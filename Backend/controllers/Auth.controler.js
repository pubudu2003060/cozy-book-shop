import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";

export const login = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    const existingUSer = await User.findOne({ email });
    if (existingUSer) {
      return res
        .status(200)
        .json({
          status: true,
          id: existingUSer._id,
          message: "User already exists",
        });
    }

    const newCart = new Cart();
    await newCart.save();

    const newUser = new User({
      name,
      email,
      picture,
      cartId: newCart._id,
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      id: newUser._id,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
