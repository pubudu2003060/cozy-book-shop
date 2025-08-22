import React from "react";
import { Link } from "react-router-dom";

const ItemCard = ({ item }) => {
  return (
    <div className="bg-theme-neutral rounded-lg shadow-lg border border-theme-secondary overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-heading text-theme-primary mb-2 font-bold">
          {item.title}
        </h3>
        <p className="font-body text-theme-secondary text-sm mb-3 line-clamp-3">
          {item.description}
        </p>
        <p className="font-body text-theme font-medium mb-4">
          <strong className="text-theme-accent">Price:</strong> ${item.price}
        </p>
        <Link to={`/item/${item.id}`}>
          <button className="w-full bg-theme-primary text-theme-neutral px-4 py-2 rounded-md hover:bg-theme-accent hover:text-theme font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105">
            Show Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ItemCard;
