import React, { useEffect, useState } from "react";
import ItemCard from "../../components/card/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { freeAxios } from "../../api/Axios";
import { toast } from "react-toastify";
import { addBooks } from "../../state/book/Bookslice";

const AllItems = () => {
  const items = useSelector((state) => state.book.data);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

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
      }
    };

    if (items.length === 0) {
      fetchFeaturedBooks();
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
          <div className="animate-pulse">
            <h2 className="text-2xl md:text-3xl font-heading text-theme-primary font-bold">
              Loading items...
            </h2>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-theme px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl md:text-3xl font-heading text-theme-primary mb-6 text-center font-bold">
        All Books
      </h2>
      {items.length === 0 ? (
        <div className="text-center">
          <div className="bg-theme-neutral p-8 rounded-lg shadow-lg">
            <h3 className="text-xl font-body text-theme mb-4">
              No items available
            </h3>
            <p className="text-theme-secondary">
              Check back later for new additions to our collection.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <ItemCard item={item} key={index} />
          ))}
        </div>
      )}
    </main>
  );
};

export default AllItems;
