import React, { useState, useEffect } from "react";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  Globe,
  Package,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  setOrders,
  setTotalOrders,
  setOrderItemCancelById,
} from "../../state/order/OrderSlice";

const Orders = () => {
  const orders = useSelector((state) => state.order.orders);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const totalOrders = useSelector((state) => state.order.totalOrders);
  const [cancelingOrderId, setCancelingOrderId] = useState(null);
  const dispatch = useDispatch();

  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders(currentPage);
  }, [currentPage]);

  const fetchOrders = async (page) => {
    try {
      setLoading(true);
      const response = await JWTAxios.get(
        `/order/getorders?page=${page}&limit=${itemsPerPage}`
      );

      if (response.data.status) {
        dispatch(setOrders(response.data.orders));

        setTotalPages(response.data.totalPages);
        dispatch(setTotalOrders(response.data.totalOrders));

        setError(null);
      } else {
        setError(response.data.message);
        toast.error(response.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
      setError("Error fetching orders");
      toast.error("Error fetching orders", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      setCancelingOrderId(orderId);
      const response = await JWTAxios.patch(`/order/cancelorder/${orderId}`);

      if (response.data.status) {
        toast.success("Order cancelled successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(setOrderItemCancelById(orderId));
      } else {
        toast.error(response.data.message || "Failed to cancel order", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error cancelling order:", error.message);
      toast.error("Error cancelling order", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } finally {
      setCancelingOrderId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500 text-white";
      case "processing":
        return "bg-blue-500 text-white";
      case "shipped":
        return "bg-purple-500 text-white";
      case "delivered":
        return "bg-green-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const canCancelOrder = (status) => {
    return (
      status.toLowerCase() !== "cancelled" &&
      status.toLowerCase() !== "delivered"
    );
  };

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <h2 className="text-2xl md:text-3xl font-heading text-theme-primary font-bold">
              Loading orders...
            </h2>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-3xl font-heading text-theme mb-4 font-bold">
            Oops! Something went wrong
          </h2>
          <p className="text-theme-secondary">{error}</p>
        </div>
      </main>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-theme-secondary">
            <h2 className="text-3xl font-bold text-theme-primary">
              Your Orders
            </h2>
          </div>
          <div className="p-6 text-center">
            <div className="py-12">
              <Package
                size={64}
                className="mx-auto text-theme-secondary mb-4"
              />
              <h3 className="text-xl text-theme mb-4">No orders found</h3>
              <p className="text-theme-secondary mb-6">
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden mb-6">
          <div className="p-6 border-b border-theme-secondary">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-theme-primary">
                Your Orders
              </h2>
              <div className="text-theme-secondary">
                Total Orders: {totalOrders}
              </div>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden border border-theme-secondary"
            >
              {/* Order Header */}
              <div className="p-6 border-b border-theme-secondary">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="text-lg font-semibold text-theme-primary">
                        Order #{order.id.slice(-8)}
                      </h3>
                      <p className="text-theme-secondary text-sm">
                        Placed on {formatDate(order.purchaseDate)}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-theme font-semibold">
                        Total:{" "}
                        <span className="text-theme-accent">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </p>
                    </div>
                    {canCancelOrder(order.status) && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelingOrderId === order.id}
                        className="bg-red-600 dark:bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700 dark:hover:bg-red-600 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <X size={16} />
                        {cancelingOrderId === order.id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Order Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-theme-primary mb-3">
                      Order Information
                    </h4>

                    <div className="flex items-center gap-3">
                      <Phone size={16} className="text-theme-secondary" />
                      <div>
                        <p className="text-sm text-theme-secondary">
                          Contact Number
                        </p>
                        <p className="text-theme">{order.contactNumber}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Globe size={16} className="text-theme-secondary" />
                      <div>
                        <p className="text-sm text-theme-secondary">Country</p>
                        <p className="text-theme">{order.country}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-theme-secondary" />
                      <div>
                        <p className="text-sm text-theme-secondary">
                          Delivery Date
                        </p>
                        <p className="text-theme">
                          {formatDate(order.deliveryDate)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock size={16} className="text-theme-secondary" />
                      <div>
                        <p className="text-sm text-theme-secondary">
                          Delivery Time
                        </p>
                        <p className="text-theme">{order.deliveryTime}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin size={16} className="text-theme-secondary mt-1" />
                      <div>
                        <p className="text-sm text-theme-secondary">
                          Delivery Location
                        </p>
                        <p className="text-theme">{order.deliveryLocation}</p>
                      </div>
                    </div>

                    {order.message && (
                      <div className="flex items-start gap-3">
                        <MessageSquare
                          size={16}
                          className="text-theme-secondary mt-1"
                        />
                        <div>
                          <p className="text-sm text-theme-secondary">
                            Special Instructions
                          </p>
                          <p className="text-theme">{order.message}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Order Items */}
                  <div>
                    <h4 className="font-semibold text-theme-primary mb-3">
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-3 border border-theme-secondary rounded-lg p-3"
                        >
                          <img
                            src={item.book.image}
                            alt={item.book.title}
                            className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-theme-primary text-sm truncate">
                              {item.book.title}
                            </h5>
                            <p className="text-theme-secondary text-xs truncate">
                              by {item.book.auther}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-theme text-xs">
                                Qty: {item.quantity}
                              </span>
                              <span className="text-theme-accent font-medium text-sm">
                                ${(item.book.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="text-theme-secondary">
                  Showing page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 bg-theme border border-theme-secondary rounded-md text-theme hover:bg-theme-primary hover:text-theme-neutral disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-2 rounded-md font-medium transition-all duration-300 ${
                            page === currentPage
                              ? "bg-theme-accent text-theme"
                              : "bg-theme border border-theme-secondary text-theme hover:bg-theme-primary hover:text-theme-neutral"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 bg-theme border border-theme-secondary rounded-md text-theme hover:bg-theme-primary hover:text-theme-neutral disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
