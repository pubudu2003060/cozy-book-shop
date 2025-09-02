import Cart from "../models/Cart.model.js";
import User from "../models/User.model.js";

export const updateProfile = async (req, res) => {
  const data = req.body;

  try {
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        name: data.name,
        contactNumber: data.contactNumber,

        address: data.address,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    return res.status(200).json({
      status: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to update profile",
      error: error.message,
    });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    const userId = user._id;
    const cartId = user.cartId;

    await User.findByIdAndDelete(userId);

    await Cart.findByIdAndDelete(cartId);

    return res
      .status(200)
      .json({ status: true, message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to delete account",
    });
  }
};
