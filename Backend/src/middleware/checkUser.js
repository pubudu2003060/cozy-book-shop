import User from "../models/User.model.js";

export const checkUser = async (req, res, next) => {
  try {
    const id = req.header("userId");

    const responce = await User.findById(id);

    if (!responce) {
      return res
        .status(404)
        .json({ status: false, message: "User cannot find" });
    }

    req.user = responce;

    next();
  } catch (error) {
    console.error("Error in checkUser middleware:", error);
    return res
      .status(500)
      .json({ status: false, message: "Error in checkUser middleware" });
  }
};
