import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DarkmoodToggler from "../darkmoodtogller/DarkmoodToggler";
import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logedOut } from "../../state/user/UserSlice";
import {
  increaseCountByAmount,
  removeDatafromCart,
  resetCartCount,
} from "../../state/cart/CartSlice";
import { JWTAxios } from "../../api/Axios";

const Header = () => {
  const isLogin = useSelector((state) => state.user.isLogedIn);
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.itemCount);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const getCartLength = async () => {
    try {
      const responce = await JWTAxios.get("/cart/getcartsize");
      if (responce.data.status) {
        console.log(responce.data.length);
        dispatch(increaseCountByAmount(responce.data.length));
      } else {
      }
    } catch (error) {
      console.log("Error in get cart size: ", error.message);
    }
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

  useEffect(() => {
    if (isLogin) {
      getCartLength();
    } else {
      dispatch(resetCartCount());
    }
  }, [isLogin]);

  return (
    <header className="relative flex items-center justify-between px-4 py-3 bg-theme shadow-lg md:px-8 md:py-4 border-b border-theme-neutral">
      <div>
        <Link
          to="/"
          className="font-heading text-2xl md:text-3xl text-theme-primary font-bold"
        >
          Bookshop
        </Link>
      </div>

      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/allitems"
              className="font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
            >
              All Items
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
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
              className="bg-theme-primary text-theme-neutral px-3 py-1 rounded-md hover:bg-theme-secondary font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary"
            >
              Log Out
            </button>

            <Link
              to="/cart"
              className="relative font-body text-theme hover:text-theme-accent transition-colors duration-300"
            >
              <span className="absolute top-[-15px] right-0 bg-theme-accent text-theme rounded-full h-5 w-5 flex items-center justify-center text-xs font-medium">
                {cartCount}
              </span>
              <ShoppingCart />
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/signin"
              className="hidden md:block font-body text-theme hover:text-theme-accent transition-colors duration-300"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="hidden md:block font-body text-theme hover:text-theme-accent transition-colors duration-300"
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
          className="text-theme hover:text-theme-accent focus:outline-none transition-colors duration-300"
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
        <nav className="md:hidden absolute top-full left-0 w-full bg-theme-neutral shadow-lg border-t border-theme-secondary z-50">
          <ul className="flex flex-col items-center py-4">
            <li className="w-full">
              <Link
                to="/"
                className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                Home
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/allitems"
                className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                All Items
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/about"
                className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
                onClick={toggleMobileMenu}
              >
                About
              </Link>
            </li>
            <li className="w-full">
              <Link
                to="/contact"
                className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
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
                    className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
                    onClick={toggleMobileMenu}
                  >
                    Sign In
                  </Link>
                </li>
                <li className="w-full">
                  <Link
                    to="/signup"
                    className="block py-2 text-center font-body text-theme hover:text-theme-accent font-medium transition-colors duration-300"
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
