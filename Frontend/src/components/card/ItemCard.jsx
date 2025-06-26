import React from "react";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-neutral-50 dark:bg-[#2d251f] rounded-lg shadow-md border border-neutral-200 dark:border-[#3d342a] overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-heading text-neutral-900 dark:text-neutral-100 mb-2">
          {item.title}
        </h3>
        <p className="font-body text-amber-700 dark:text-amber-200 text-sm mb-3 line-clamp-3">
          {item.description}
        </p>
        <p className="font-body text-neutral-900 dark:text-neutral-100 font-medium mb-4">
          <strong>Price:</strong> ${item.price}
        </p>
        <button className="w-full bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-md hover:bg-green-800 dark:hover:bg-green-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
