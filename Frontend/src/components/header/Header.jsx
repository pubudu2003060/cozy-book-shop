import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkmoodToggler from "../darkmoodtogller/DarkmoodToggler";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logedOut } from "../../state/user/UserSlice";
import { removeDatafromCart, resetCartCount } from "../../state/cart/CartSlice";

const Header = () => {
  const isLogin = useSelector((state) => state.user.isLogedIn);
  const dispatch = useDispatch();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.itemCount);

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    if (isLogin) {
      dispatch(logedOut());
      dispatch(resetCartCount());
      dispatch(removeDatafromCart());
      localStorage.removeItem("accessToken");
      navigate("/");
    }
  };

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-white dark:bg-[#1a1611] shadow-md md:px-8 md:py-4">
      <div>
        <Link
          to="/"
          className="font-heading text-2xl md:text-3xl text-amber-900 dark:text-amber-700"
        >
          Bookshop
        </Link>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allitems"
              className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
            >
              All Items
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <div className="flex items-center space-x-3 md:space-x-4">
        {isLogin ? (
          <>
            <button
              onClick={handleLogout}
              className="bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-3 py-1 rounded-md hover:bg-green-800 dark:hover:bg-green-700 text-sm md:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
            >
              Log Out
            </button>

            <Link
              to="/cart"
              className="relative font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 text-sm md:text-base"
            >
              <span className="absolute top-[-15px] right-0 bg-orange-600 dark:bg-orange-500 rounded-2xl h-5 w-5 flex items-center justify-center text-xs text-neutral-100 dark:text-neutral-900">
                {cartCount}
              </span>
              <ShoppingCart />
            </Link>
          </>
        ) : (
          <>
            {" "}
            <Link
              to="/signin"
              className="hidden md:block font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 text-sm md:text-base"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="hidden md:block font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 text-sm md:text-base"
            >
              Sign Up
            </Link>
          </>
        )}

        <DarkmoodToggler />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="md:hidden">
        <button
          className="text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 focus:outline-none"
          aria-label={
            isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"
          }
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 w-full bg-neutral-50 dark:bg-[#2d251f] shadow-md">
          <ul className="flex flex-col items-center py-4">
            <li className="w-full">
              <Link
                to="/"
                className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/allitems"
                className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                onClick={toggleMobileMenu}
              >
                All Items
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/about"
                className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/contact"
                className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                onClick={toggleMobileMenu}
              >
                Contact
              </Link>
            </li>
            {isLogin ? (
              <></>
            ) : (
              <>
                <li className="w-full">
                  <Link
                    to="/signin"
                    className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                </li>

                <li className="w-full">
                  <Link
                    to="/signup"
                    className="block py-2 text-center font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
                    onClick={toggleMobileMenu}
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
