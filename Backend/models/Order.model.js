import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  deliveryDate: {
    type: Date,
    required: true,
  },
  deliveryTime: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  deliveryLocation: {
    type: String,
    required: true,
  },
  Message: {
    type: String,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  books: {
    type: [
      {
        bookId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
