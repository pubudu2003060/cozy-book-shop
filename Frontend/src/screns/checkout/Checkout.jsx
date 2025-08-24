import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Calendar, Clock, MapPin, MessageSquare, User } from "lucide-react";
import { removeDatafromCart, resetCartCount } from "../../state/cart/CartSlice";

const Checkout = () => {
  const cart = useSelector((state) => state.cart.data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    deliveryDate: "",
    deliveryTime: "",
    deliveryLocation: "",
    message: "",
  });

  // Districts list
  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
    "Puttalam",
    "Kurunegala",
    "Anuradhapura",
    "Polonnaruwa",
    "Badulla",
    "Moneragala",
    "Ratnapura",
    "Kegalle",
    "Ampara",
    "Batticaloa",
    "Trincomalee",
  ];

  const deliveryTimes = ["10 AM", "11 AM", "12 PM"];

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate("/cart");
      return;
    }
  }, [cart, navigate]);

  const handleInputChange = (e) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validation
    if (!formData.username.trim()) {
      toast.error("Please enter your username", {
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

    if (!formData.deliveryLocation) {
      toast.error("Please select a delivery location", {
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
      const orderData = {
        username: formData.username,
        deliveryDate: formData.deliveryDate,
        deliveryTime: formData.deliveryTime,
        deliveryLocation: formData.deliveryLocation,
        message: formData.message,
        items: cart.map((item) => ({
          bookId: item.bookId._id,
          title: item.bookId.title,
          quantity: item.quantity,
          price: item.bookId.price,
        })),
        totalAmount: calculateTotal(),
        purchaseDate: new Date().toISOString().split("T")[0],
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

        // Clear cart
        dispatch(removeDatafromCart());
        dispatch(resetCartCount());

        navigate("/");
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
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div className="bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
            <div className="p-6 border-b border-theme-secondary">
              <h2 className="text-3xl font-bold text-theme-primary">
                Checkout
              </h2>
              <p className="text-theme-secondary mt-1">
                Complete your order details
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Username */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <User size={18} className="mr-2" />
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                  placeholder="Enter your username"
                  required
                />
              </div>

              {/* Delivery Date */}
              <div>
                <label className="flex items-center text-theme-primary font-medium mb-2">
                  <Calendar size={18} className="mr-2" />
                  Delivery Date
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleInputChange}
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
                  Delivery Time
                </label>
                <select
                  name="deliveryTime"
                  value={formData.deliveryTime}
                  onChange={handleInputChange}
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
                  Delivery Location
                </label>
                <select
                  name="deliveryLocation"
                  value={formData.deliveryLocation}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-theme border border-theme-secondary rounded-md text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary focus:border-transparent transition-all duration-300"
                  required
                >
                  <option value="">Select district</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
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
                  onChange={handleInputChange}
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
              <div className="space-y-4 mb-6">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-4 border-b border-theme-secondary pb-4 last:border-b-0"
                  >
                    <img
                      src={item.bookId.image}
                      alt={item.bookId.title}
                      className="w-16 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-theme-primary text-sm">
                        {item.bookId.title}
                      </h4>
                      <p className="text-theme-secondary text-sm">
                        by {item.bookId.auther}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-theme text-sm">
                          Qty: {item.quantity}
                        </span>
                        <span className="text-theme-accent font-medium">
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
