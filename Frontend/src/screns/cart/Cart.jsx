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
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <h2 className="text-2xl md:text-3xl font-heading text-theme-primary font-bold">
              Loading cart data...
            </h2>
          </div>
        </div>
      </main>
    );

  if (error)
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

  if (!cart || cart.length === 0)
    return (
      <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
          <div className="p-6 border-b border-theme-secondary">
            <h2 className="text-3xl font-bold text-theme-primary">Your Cart</h2>
          </div>
          <div className="p-6 text-center">
            <div className="py-12">
              <h3 className="text-xl text-theme mb-4">Your cart is empty</h3>
              <p className="text-theme-secondary mb-6">
                Start shopping to add items to your cart!
              </p>
            </div>
          </div>
          <div className="p-6 border-t border-theme-secondary">
            <Link
              to="/"
              className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
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
    <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-theme-secondary">
          <h2 className="text-3xl font-bold text-theme-primary">Your Cart</h2>
        </div>

        <div className="p-6">
          <ul className="space-y-6">
            {cart.map((item, index) => (
              <li
                key={index}
                className="flex flex-col sm:flex-row gap-4 border-b border-theme-secondary pb-6 last:border-b-0"
              >
                <img
                  src={item.bookId.image}
                  alt={`Cover of ${item.bookId.title}`}
                  className="w-full sm:w-24 h-32 object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                  aria-label={`Cover of ${item.bookId.title}`}
                />
                <div className="flex-1 space-y-2">
                  <h3 className="text-lg font-semibold text-theme-primary">
                    {item.bookId.title}
                  </h3>
                  <p className="text-theme-secondary">
                    by {item.bookId.auther}
                  </p>
                  <p className="text-theme">
                    Price:{" "}
                    <span className="text-theme-accent font-medium">
                      ${item.bookId.price.toFixed(2)}
                    </span>
                  </p>
                  <div className="flex gap-5 items-center">
                    <p className="text-theme-secondary">Quantity:</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(increaseCartItemAmountByid(item.bookId._id))
                        }
                        className="p-1 text-theme hover:text-theme-accent border border-theme-secondary rounded-full hover:border-theme-accent transition-all duration-300"
                      >
                        <Plus size={16} />
                      </button>
                      <span className="text-theme font-medium min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          dispatch(decreaseCartItemAmountByid(item.bookId._id))
                        }
                        className="p-1 text-theme hover:text-theme-accent border border-theme-secondary rounded-full hover:border-theme-accent transition-all duration-300"
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                  <p className="text-theme font-medium">
                    Subtotal:{" "}
                    <span className="text-theme-accent">
                      ${(item.bookId.price * item.quantity).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex sm:flex-col gap-2">
                  <button
                    onClick={() => handleupdate(item._id, item.quantity)}
                    className="bg-theme-primary text-theme-neutral px-4 py-2 rounded-md hover:bg-theme-accent hover:text-theme font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary"
                  >
                    Update
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-theme-secondary">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-theme">
                Total Amount:
              </h3>
              <p className="text-2xl font-bold text-theme-accent">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
            <button className="w-full mt-4 bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary">
              Proceed to Checkout
            </button>
          </div>
        </div>

        <div className="p-6 border-t border-theme-secondary">
          <Link
            to="/"
            className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
