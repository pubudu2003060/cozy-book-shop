import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { freeAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import ItemCard from "../../components/card/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addBooks } from "../../state/book/Bookslice";

const Home = () => {
  const featuredBooks = useSelector((state) => state.book.data);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        const response = await freeAxios.get("/book/getallbooks");
        if (response.data.status) {
          dispatch(addBooks(response.data.books));
        } else {
          toast.error("Failed to fetch featured books", {
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
        console.error("Error fetching featured books:", error);
        toast.error("Error fetching featured books", {
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
      }
    };

    if (featuredBooks.length === 0) {
      fetchFeaturedBooks();
    }

    setLoading(false);
  }, []);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-theme px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="bg-theme-neutral rounded-2xl p-8 shadow-lg border border-theme-secondary">
          <h1 className="text-3xl md:text-4xl font-heading text-theme-primary mb-4 font-bold">
            Welcome to Cozy Bookshop
          </h1>
          <p className="font-body text-theme-secondary text-lg max-w-2xl mx-auto mb-6">
            Discover a world of stories in our warm, inviting bookshop. From
            timeless classics to modern bestsellers, find your next great read
            and join our community of book lovers.
          </p>
          <Link
            to="/allitems"
            className="inline-block bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105"
          >
            Browse All Books
          </Link>
        </div>
      </section>

      {/* Featured Books Section */}
      <section>
        <h2 className="text-2xl md:text-3xl font-heading text-theme-primary mb-6 text-center font-bold">
          Featured Books
        </h2>
        {loading ? (
          <div className="text-center bg-theme-neutral rounded-lg p-8">
            <div className="animate-pulse">
              <h3 className="text-xl font-body text-theme">
                Loading featured books...
              </h3>
            </div>
          </div>
        ) : featuredBooks.length === 0 ? (
          <div className="text-center bg-theme-neutral rounded-lg p-8">
            <h3 className="text-xl font-body text-theme">
              No featured books available
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBooks.slice(0, 9).map((book, index) => (
              <ItemCard item={book} key={index} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
