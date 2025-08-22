import React, { useContext, useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { freeAxios, JWTAxios } from "../../api/Axios";
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
    const fetchBook = async () => {
      try {
        const response = await freeAxios.get(`/book/getbookbyid/${id}`);
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
      <div className="min-h-screen bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-theme mb-4">
              Oops! Something went wrong
            </h2>
            <p className="text-theme-secondary">{error}</p>
          </div>
        </div>
      </div>
    );

  if (!book)
    return (
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <h2 className="text-2xl md:text-3xl font-heading text-theme-primary font-bold">
              Loading item data...
            </h2>
          </div>
        </div>
      </main>
    );

  return (
    <div className="min-h-screen bg-theme py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-theme-neutral rounded-lg shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-theme-secondary">
          <h2 className="text-3xl font-bold text-theme-primary">
            {book.title}
          </h2>
          <p className="text-sm text-theme-secondary mt-1 font-medium">
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
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-theme-primary mb-2">
                Description
              </h3>
              <p className="text-theme-secondary leading-relaxed">
                {book.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-theme-primary mb-3">
                Book Details
              </h3>
              <ul className="text-theme space-y-2">
                <li className="flex justify-between">
                  <span className="text-theme-secondary">Author:</span>
                  <span className="font-medium">{book.auther}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-theme-secondary">Published:</span>
                  <span className="font-medium">
                    {new Date(book.publishedDate).toLocaleDateString()}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span className="text-theme-secondary">ISBN:</span>
                  <span className="font-medium">{book.isbnNo}</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-theme-secondary">Available:</span>
                  <span className="font-medium">{book.quantity} copies</span>
                </li>
                <li className="flex justify-between items-center pt-2 border-t border-theme-secondary">
                  <span className="text-theme-secondary text-lg">Price:</span>
                  <span className="text-2xl font-bold text-theme-accent">
                    ${book.price.toFixed(2)}
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <button
                onClick={handleAddToCart}
                className="w-full bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105"
                aria-label={`Add ${book.title} to cart`}
              >
                Add to Cart - ${book.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="p-6 border-t border-theme-secondary">
          <Link
            to="/allitems"
            className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
          >
            ← Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Item;
