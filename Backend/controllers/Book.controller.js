import Book from "../models/Book.model.js";

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
        _id: book._id,
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
    res.status(500).json({
      status: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};
