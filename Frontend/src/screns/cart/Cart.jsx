import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Minus, Plus } from "lucide-react";
import {
  addDatatoCart,
  decreaseCartItemAmountByid,
  increaseCartItemAmountByid,
} from "../../state/cart/CartSlice";

const Cart = () => {
  const cart = useSelector((state) => state.cart.data);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await JWTAxios.get("/cart/loadcartdata");
        if (response.data.status) {
          console.log(response.data.cart);
          dispatch(addDatatoCart(response.data.cart));
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

  const handleupdate = async (itemId, quantity) => {
    try {
      const responce = await JWTAxios.put("cart/updatecartitemquantity", {
        itemId,
        quantity,
      });
      if (responce.data.status) {
        toast.success("Update quantity successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else {
        toast.error("Fail Update quantity", {
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
      console.log("Error Update quantity: ", error.message);
      toast.error("Error Update quantity", {
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
  };

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

  if (!cart)
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

  const totalPrice = cart.reduce(
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
            {cart.map((item, index) => (
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
                  <div className="flex gap-5 items-center">
                    <div>
                      <p className="text-amber-700 dark:text-amber-200">
                        Quantity:
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          dispatch(increaseCartItemAmountByid(item.bookId._id))
                        }
                        className="text-neutral-900 dark:text-neutral-100 border-1 rounded-2xl border-orange-600 dark:border-orange-500"
                      >
                        <Plus />
                      </button>
                      <p className="text-amber-700 dark:text-amber-200">
                        {item.quantity}
                      </p>
                      <button
                        onClick={() =>
                          dispatch(decreaseCartItemAmountByid(item.bookId._id))
                        }
                        className="text-neutral-900 dark:text-neutral-100 border-1 rounded-2xl border-orange-600 dark:border-orange-500"
                      >
                        <Minus />
                      </button>
                    </div>
                  </div>

                  <p className="text-amber-700 dark:text-amber-200 font-medium">
                    Subtotal: ${(item.bookId.price * item.quantity).toFixed(2)}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => handleupdate(item._id, item.quantity)}
                    className="bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-3 py-1 rounded-md hover:bg-green-800 dark:hover:bg-green-700 text-sm md:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
                  >
                    Update
                  </button>
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
