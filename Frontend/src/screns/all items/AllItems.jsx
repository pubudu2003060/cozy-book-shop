import React, { useEffect, useState } from "react";
import ItemCard from "../../components/card/ItemCard";
import { useSelector } from "react-redux";

const AllItems = () => {
  const items = useSelector((state) => state.book.data);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  if (loading) {
    return (
      <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100">
          Loading items...
        </h2>
      </main>
    );
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100 mb-6 text-center">
        All Books
      </h2>
      {items.length === 0 ? (
        <div className="text-center">
          <h3 className="text-xl font-body text-neutral-900 dark:text-neutral-100">
            No items available
          </h3>
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
