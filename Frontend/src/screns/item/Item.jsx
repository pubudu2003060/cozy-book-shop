import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { JWTAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { increaseCountByOne } from "../../state/cart/CartSlice";

const Item = () => {
  const isLogin = useSelector((state) => state.user.isLogedIn);
  const navigate = useNavigate();
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      toast.error("Please login to see book details", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      navigate("/signin");
    } else {
      const fetchBook = async () => {
        try {
          const response = await JWTAxios.get(`/book/getbookbyid/${id}`);
          if (response.data.status) {
            setBook(response.data.book);
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
        } catch (err) {
          setError("Failed to fetch book data");
          console.error(err);
          toast.error("Error fetching book data", {
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
      fetchBook();
    }
  }, [id, isLogin, navigate]);

  const handleAddToCart = async () => {
    try {
      const cartData = {
        bookId: id,
      };
      const responce = await JWTAxios.post("/cart/addtocart", cartData);
      if (responce.data.status) {
        toast.success(responce.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        dispatch(increaseCountByOne());
        navigate("/cart");
      } else {
        toast.error(responce.data.message, {
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
      console.log(error);
      toast.error(error.response.data.message, {
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

  if (error)
    return (
      <div className="text-red-500 text-center mt-8 text-lg font-semibold">
        {error}
      </div>
    );
  if (!book)
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100">
          Loading item data...
        </h2>
      </main>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1611] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-neutral-50 dark:bg-[#2d251f] rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-neutral-200 dark:border-[#3d342a]">
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            {book.title}
          </h2>
          <p className="text-sm text-amber-700 dark:text-amber-200 mt-1">
            by {book.auther}
          </p>
        </div>

        {/* Main Content */}
        <div className="p-6 flex flex-col md:flex-row gap-6">
          {/* Book Image */}
          <div className="md:w-1/3">
            <img
              src={book.image}
              alt={`Cover of ${book.title}`}
              className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              aria-label={`Cover of ${book.title}`}
            />
          </div>

          {/* Book Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Description
              </h3>
              <p className="text-amber-700 dark:text-amber-200">
                {book.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                Details
              </h3>
              <ul className="text-amber-700 dark:text-amber-200 space-y-2">
                <li>
                  <span className="font-medium">Author:</span> {book.auther}
                </li>
                <li>
                  <span className="font-medium">Published Date:</span>{" "}
                  {new Date(book.publishedDate).toLocaleDateString()}
                </li>
                <li>
                  <span className="font-medium">ISBN:</span> {book.isbnNo}
                </li>
                <li>
                  <span className="font-medium">Price:</span> $
                  {book.price.toFixed(2)}
                </li>
                <li>
                  <span className="font-medium">Quantity Available:</span>{" "}
                  {book.quantity}
                </li>
              </ul>
            </div>

            <button
              onClick={handleAddToCart}
              className="inline-block w-full sm:w-auto bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-6 py-3 rounded-md hover:bg-green-800 dark:hover:bg-green-700 font-medium transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 text-center"
              aria-label={`Add ${book.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Back Link */}
        <div className="p-6 border-t border-neutral-200 dark:border-[#3d342a]">
          <Link
            to="/allitems"
            className="text-amber-700 dark:text-amber-200 hover:text-orange-600 dark:hover:text-orange-500 transition-colors duration-300"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
