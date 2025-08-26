import User from "../models/User.model.js";
import Cart from "../models/Cart.model.js";

export const login = async (req, res) => {
  try {
    const { email, name, picture } = req.body;

    const existingUSer = await User.findOne({ email });
    if (existingUSer) {
      const user = {
        name: existingUSer.name,
        email: existingUSer.email,
        picture: existingUSer.picture,
        contactNumber: existingUSer.contactNumber,
        country: existingUSer.country,
        address: existingUSer.address,
      };

      return res.status(200).json({
        status: true,
        id: existingUSer._id,
        message: "User already exists",
        user,
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

    const user = {
      name: newUser.name,
      email: newUser.email,
      picture: newUser.picture,
    };

    res.status(201).json({
      status: true,
      id: newUser._id,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error in signInUser:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};
