import mongoose, { mongo } from "mongoose";

const cartScheme = new mongoose.Schema({
  books: [
    {
      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

const Cart = mongoose.model("Cart", cartScheme);

export default Cart;
