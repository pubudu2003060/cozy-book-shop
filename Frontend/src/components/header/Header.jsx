import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.jpg";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div>
        <img src={logo} alt="" className="h-10 w-10 object-contain" />
      </div>

      <nav>
        <ul className="flex space-x-6">
          <li>
            <Link
              to=""
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="allitems"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              All Items
            </Link>
          </li>
          <li>
            <Link
              to="about"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-4">
        <Link to="signin" className="text-gray-600 hover:text-blue-600">
          Sign In
        </Link>
        <Link to="signup" className="text-gray-600 hover:text-blue-600">
          Sign Up
        </Link>
        <Link to="cart" className="text-gray-600 hover:text-blue-600">
          Cart
        </Link>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
