import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "../../state/book/Bookslice";

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const count = useSelector((state) => state.book.value);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await JWTAxios.get("/cart/loadcartdata");
        if (response.data.status) {
          setCart(response.data.cart);
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
        console.error("Error fetching cart data:", error.message);
        setError("Error fetching cart data");
        toast.error("Error fetching cart data", {
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
    fetchCartData();
  }, []);

  if (loading)
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100">
          Loading cart Data...
        </h2>
      </main>
    );

  if (error)
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100">
          {error}
        </h2>
      </main>
    );

  if (!cart || cart.books.length === 0)
    return (
      <div className="min-h-screen bg-white dark:bg-[#1a1611] py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-[#2d251f] rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-neutral-200 dark:border-[#3d342a]">
            <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
              Your Cart
            </h2>
          </div>
          <div className="p-6 text-center text-amber-700 dark:text-amber-200">
            Your cart is empty
          </div>
          <div className="p-6 border-t border-neutral-200 dark:border-[#3d342a]">
            <Link
              to="/"
              className="text-amber-700 dark:text-amber-200 hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-300"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );

  const totalPrice = cart.books.reduce(
    (total, item) => total + item.bookId.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1611] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-[#2d251f] rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-neutral-200 dark:border-[#3d342a]">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Your Cart
          </h2>
        </div>

        <div className="p-6">
          <ul className="space-y-4">
            {cart.books.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row gap-4 border-b border-neutral-200 dark:border-[#3d342a] pb-4"
              >
                <img
                  src={item.bookId.image}
                  alt={`Cover of ${item.bookId.title}`}
                  className="w-full sm:w-24 h-32 object-cover rounded-lg shadow-md"
                  aria-label={`Cover of ${item.bookId.title}`}
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    {item.bookId.title}
                  </h3>
                  <p className="text-amber-700 dark:text-amber-200">
                    by {item.bookId.auther}
                  </p>
                  <p className="text-amber-700 dark:text-amber-200">
                    Price: ${item.bookId.price.toFixed(2)}
                  </p>
                  <p className="text-amber-700 dark:text-amber-200">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-amber-700 dark:text-amber-200 font-medium">
                    Subtotal: ${(item.bookId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <p className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="p-6 border-t border-neutral-200 dark:border-[#3d342a]">
          <Link
            to="/"
            className="text-amber-700 dark:text-amber-200 hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-300"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
