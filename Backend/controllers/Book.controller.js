import Book from "../models/Book.model.js";
import mongoose from "mongoose";

export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find({});

    if (!books || books.length === 0) {
      return res.status(404).json({
        status: false,
        message: "No books found",
      });
    }

    const returnbookset = books.map((book) => {
      return {
        id: book._id,
        title: book.title,
        description: book.description,
        image: book.image,
        price: book.price,
      };
    });

    res.status(200).json({
      status: true,
      message: "Books fetched successfully",
      books: returnbookset,
    });
  } catch (error) {
    console.error("Error in get all books: ", error);
    res.status(500).json({
      status: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: false,
        message: "Invalid book ID",
      });
    }

    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({
        status: false,
        message: "Book not found",
      });
    }

    const returnBook = {
      id: book._id,
      title: book.title,
      description: book.description,
      image: book.image,
      auther: book.auther,
      publishedDate: book.publishedDate,
      isbnNo: book.isbnNo,
      price: book.price,
      quantity: book.quantity,
    };

    res.status(200).json({
      status: true,
      message: "Book fetched successfully",
      book: returnBook,
    });
  } catch (error) {
    console.error("Error in get book by id: ", error);
    res.status(500).json({
      status: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};
