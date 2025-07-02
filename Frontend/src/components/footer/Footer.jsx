import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-[#1a1611]  px-4 sm:px-6 lg:px-8 py-8 border-t border-neutral-200 dark:border-neutral-700">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-heading text-neutral-900 dark:text-neutral-100 mb-4">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allitems"
                  className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-body text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-heading text-neutral-900 dark:text-neutral-100 mb-4">
              Stay Updated
            </h3>
            <p className="font-body text-amber-700 dark:text-amber-200 mb-4">
              Subscribe to our newsletter for the latest book releases and
              offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-orange-600 dark:focus:ring-orange-500"
                disabled
              />
              <button
                className="bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-r-md hover:bg-green-800 dark:hover:bg-green-700 transition-colors"
                disabled
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm font-body text-neutral-600 dark:text-neutral-400 mt-2">
              Newsletter signup is disabled in this demo.
            </p>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-heading text-neutral-900 dark:text-neutral-100 mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-900 dark:text-neutral-100 hover:text-orange-600 dark:hover:text-orange-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="font-body text-neutral-900 dark:text-neutral-100">
              Email: support@cozybookshop.com
            </p>
            <p className="font-body text-neutral-900 dark:text-neutral-100">
              Phone: (123) 456-7890
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-700 text-center">
          <p className="font-body text-neutral-900 dark:text-neutral-100 text-sm">
            &copy; {new Date().getFullYear()} Cozy Bookshop. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
