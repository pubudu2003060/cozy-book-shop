import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
      unique: true,
    },
    sub: {
      type: String,
      requieed: true,
    },
    picture: {
      type: String,
    },
    contactNumber: {
      type: String,
    },

    address: {
      type: String,
    },
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  },
  { Timestamp: true }
);

const User = mongoose.model("User", userSchema);

export default User;
