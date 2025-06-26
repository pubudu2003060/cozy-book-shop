import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  auther: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
    required: true,
  },
  isbnNo: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);

export default Book;
