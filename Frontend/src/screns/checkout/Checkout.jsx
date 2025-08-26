import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  Calendar,
  Clock,
  MapPin,
  MessageSquare,
  User,
  Mail,
  Phone,
  Globe,
  Edit,
} from "lucide-react";
import { removeDatafromCart, resetCartCount } from "../../state/cart/CartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.data);
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // Order form data
  const [formData, setFormData] = useState({
    contactNumber: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
    message: "",
  });

  const deliveryTimes = ["10 AM", "11 AM", "12 PM"];

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        contactNumber: user.contactNumber || "",
        deliveryLocation: user.address || "",
      }));
    }
  }, [cart, navigate, user]);

  const handleOrderInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const isValidDate = (date) => {
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if date is today or future
    if (selectedDate < today) return false;

    // Check if it's not Sunday (0 = Sunday)
    if (selectedDate.getDay() === 0) return false;

    return true;
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.bookId.price * item.quantity,
      0
    );
  };

  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.contactNumber.trim()) {
      toast.error("Please enter your contact number", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    if (!formData.deliveryDate) {
      toast.error("Please select a delivery date", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    if (!isValidDate(formData.deliveryDate)) {
      toast.error(
        "Please select a valid delivery date (not today and not Sunday)",
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      setLoading(false);
      return;
    }

    if (!formData.deliveryTime) {
      toast.error("Please select a delivery time", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    if (!formData.deliveryLocation.trim()) {
      toast.error("Please enter a delivery location", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Please select items to checkout", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setLoading(false);
      return;
    }

    try {
      const userId = localStorage.getItem("userId");

      const orderData = {
        userId,
        contactNumber: formData.contactNumber,
        country: user.country,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        deliveryLocation: formData.deliveryLocation,
        message: formData.message,
        items: cart.map((item) => ({
          bookId: item.bookId._id,
          quantity: item.quantity,
        })),
        totalAmount: calculateTotal(),
        purchaseDate: getCurrentDate(),
      };

      const response = await JWTAxios.post("/order/createorder", orderData);

      if (response.data.status) {
        toast.success("Order placed successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        dispatch(removeDatafromCart());
        dispatch(resetCartCount());

        navigate("/orders");
      } else {
        toast.error(response.data.message || "Failed to place order", {
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
      console.error("Error placing order:", error);
      toast.error("Error placing order", {
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

  if (!cart || cart.length === 0) {
    return (
      <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 text-center">
            <h2 className="text-3xl font-bold text-theme-primary mb-4">
              No Items to Checkout
            </h2>
            <p className="text-theme-secondary mb-6">
              Your cart is empty. Add some books before checkout.
            </p>
            <Link
              to="/"
              className="bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* User Profile Section */}
          <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-theme-secondary">
              <h3 className="text-2xl font-bold text-theme-primary">
                Profile Information
              </h3>
              <p className="text-theme-secondary text-sm mt-1">
                Your account details
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Profile Picture and Name */}
              <div className="text-center mb-6">
                <img
                  src={user?.picture || "/api/placeholder/80/80"}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-2 border-theme-secondary"
                />
                <h4 className="text-lg font-semibold text-theme-primary">
                  {user?.name || "User"}
                </h4>
              </div>

              {/* Name (Read-only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2 text-sm">
                  <User size={16} className="mr-2" />
                  Full Name
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-3 py-2 text-sm opacity-60">
                  {user?.name || "Not set"}
                </div>
              </div>

              {/* Email (Read-only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2 text-sm">
                  <Mail size={16} className="mr-2" />
                  Email
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-3 py-2 text-sm opacity-60">
                  {user?.email || "Not set"}
                </div>
              </div>

              {/* Contact Number (Read-only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2 text-sm">
                  <Phone size={16} className="mr-2" />
                  Contact Number
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-3 py-2 text-sm opacity-60">
                  {user?.contactNumber || "Not set"}
                </div>
              </div>

              {/* Country (Read-only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2 text-sm">
                  <Globe size={16} className="mr-2" />
                  Country
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-3 py-2 text-sm opacity-60">
                  {user?.country || "Not set"}
                </div>
              </div>

              {/* Address (Read-only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2 text-sm">
                  <MapPin size={16} className="mr-2" />
                  Address
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-3 py-2 text-sm min-h-[4rem] opacity-60">
                  {user?.address || "Not set"}
                </div>
              </div>

              {/* Link to Profile Page */}
              <div className="mt-4 pt-4 border-t border-theme-secondary">
                <Link
                  to="/profile"
                  className="flex items-center justify-center gap-2 text-theme-accent hover:text-theme-primary transition-colors duration-300 text-sm font-medium"
                >
                  <Edit size={16} />
                  Edit Profile Details
                </Link>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-theme-secondary">
              <h2 className="text-3xl font-bold text-theme-primary">
                Order Details
              </h2>
              <p className="text-theme-secondary mt-1">
                Complete your order information
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Contact Number */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <Phone size={18} className="mr-2" />
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleOrderInputChange}
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter contact number for this order"
                  required
                />
              </div>

              {/* Purchase Date (Display only) */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <Calendar size={18} className="mr-2" />
                  Date of Purchase
                </label>
                <div className="text-theme bg-theme border border-theme-secondary rounded-md px-4 py-3 opacity-60">
                  {new Date().toLocaleDateString()}
                </div>
              </div>

              {/* Delivery Date */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <Calendar size={18} className="mr-2" />
                  Preferred Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleOrderInputChange}
                  min={getTomorrowDate()}
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                  required
                />
                <p className="text-sm text-theme-secondary mt-1">
                  Select a future date (Sundays excluded)
                </p>
              </div>

              {/* Delivery Time */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <Clock size={18} className="mr-2" />
                  Preferred Delivery Time
                </label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleOrderInputChange}
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select delivery time</option>
                  {deliveryTimes.map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* Delivery Location */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <MapPin size={18} className="mr-2" />
                  Preferred Delivery Location
                </label>
                <textarea
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleOrderInputChange}
                  rows="3"
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Enter delivery address (defaults to your profile address)"
                  required
                />
                <p className="text-sm text-theme-secondary mt-1">
                  You can modify the delivery address if different from your
                  profile address
                </p>
              </div>

              {/* Message */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <MessageSquare size={18} className="mr-2" />
                  Special Instructions (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleOrderInputChange}
                  rows="4"
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Any special delivery instructions..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-theme-secondary">
              <h3 className="text-2xl font-bold text-theme-primary">
                Order Summary
              </h3>
            </div>

            <div className="p-6">
              <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-3 border-b border-theme-secondary pb-3 last:border-b-0"
                  >
                    <img
                      src={item.bookId.image}
                      alt={item.bookId.title}
                      className="w-12 h-16 object-cover rounded-md flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-theme-primary text-sm truncate">
                        {item.bookId.title}
                      </h4>
                      <p className="text-theme-secondary text-xs truncate">
                        by {item.bookId.auther}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-theme text-xs">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-theme-accent font-medium text-sm">
                          ${(item.bookId.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-theme-secondary pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-theme">Items ({cart.length}):</span>
                  <span className="text-theme">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-theme">Delivery:</span>
                  <span className="text-theme">Free</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold border-t border-theme-secondary pt-2">
                  <span className="text-theme-primary">Total:</span>
                  <span className="text-theme-accent">
                    ${calculateTotal().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Cart Link */}
        <div className="mt-8 text-center">
          <Link
            to="/cart"
            className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
