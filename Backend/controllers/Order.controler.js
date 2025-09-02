import Cart from "../models/Cart.model.js";
import Order from "../models/Order.model.js";
import Book from "../models/Book.model.js";

export const makeOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const orderDetails = req.body;
    const cartId = req.user.cartId;

    if (!userId || userId.toString() !== orderDetails.userId) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized action" });
    }

    const requiredFields = [
      "contactNumber",

      "deliveryDate",
      "deliveryTime",
      "deliveryLocation",
      "purchaseDate",
      "totalAmount",
      "items",
    ];

    for (const field of requiredFields) {
      if (
        !orderDetails[field] ||
        (Array.isArray(orderDetails[field]) && !orderDetails[field].length)
      ) {
        return res
          .status(400)
          .json({ status: false, message: `Missing field: ${field}` });
      }
    }

    const recentOrder = await Order.findOne({
      userId,
      totalAmount: orderDetails.totalAmount,
      purchaseDate: { $gte: new Date(Date.now() - 5000) },
    });

    if (recentOrder) {
      return res
        .status(409)
        .json({ status: false, message: "Duplicate order attempt detected" });
    }

    for (const item of orderDetails.items) {
      const book = await Book.findById(item.bookId);
      if (!book) {
        return res
          .status(404)
          .json({ status: false, message: `Book not found: ${item.bookId}` });
      }
      if (book.quantity && book.quantity < item.quantity) {
        return res.status(400).json({
          status: false,
          message: `Not enough stock for ${book.title}. Available: ${book.stock}`,
        });
      }
    }

    const newOrder = new Order({
      userId: orderDetails.userId,
      contactNumber: orderDetails.contactNumber,

      deliveryDate: new Date(orderDetails.deliveryDate),
      deliveryTime: orderDetails.deliveryTime,
      deliveryLocation: orderDetails.deliveryLocation,
      purchaseDate: new Date(orderDetails.purchaseDate),
      totalAmount: orderDetails.totalAmount,
      message: orderDetails.message || "",
      status: "Pending",
      books: orderDetails.items.map((item) => ({
        bookId: item.bookId,
        quantity: item.quantity,
      })),
    });

    await newOrder.save();

    for (const item of orderDetails.items) {
      await Book.findByIdAndUpdate(item.bookId, {
        $inc: { quantity: -item.quantity },
      });
    }

    await Cart.findOneAndUpdate({ _id: cartId }, { $set: { books: [] } });

    res.status(201).json({
      status: true,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const getOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const { page = 1, limit = 10 } = req.query;

    if (!userId) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized action" });
    }

    const orders = await Order.find({ userId })
      .populate("books.bookId")
      .sort({ purchaseDate: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalOrders = await Order.countDocuments({ userId });

    const formattedOrders = orders.map((order) => ({
      id: order._id,
      status: order.status,
      purchaseDate: order.purchaseDate,
      deliveryDate: order.deliveryDate,
      deliveryTime: order.deliveryTime,

      deliveryLocation: order.deliveryLocation,
      message: order.message,
      contactNumber: order.contactNumber,
      totalAmount: order.totalAmount,
      items: order.books.map((item) => ({
        book: item.bookId,
        quantity: item.quantity,
      })),
    }));

    res.status(200).json({
      status: true,
      totalOrders,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalOrders / limit),
      orders: formattedOrders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    if (!userId) {
      return res
        .status(403)
        .json({ status: false, message: "Unauthorized action" });
    }

    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) {
      return res
        .status(404)
        .json({ status: false, message: "Order not found" });
    }

    if (order.status === "Cancelled") {
      return res
        .status(400)
        .json({ status: false, message: "Order already cancelled" });
    }

    if (order.status === "Delivered") {
      return res.status(400).json({
        status: false,
        message: "Delivered orders cannot be cancelled",
      });
    }

    for (const item of order.books) {
      await Book.findByIdAndUpdate(item.bookId, {
        $inc: { quantity: item.quantity },
      });
    }

    order.status = "Cancelled";
    await order.save();

    res
      .status(200)
      .json({ status: true, message: "Order cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};
