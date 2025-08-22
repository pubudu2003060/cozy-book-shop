import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-theme px-4 sm:px-6 lg:px-8 py-8 border-t border-theme-neutral">
      <div className="max-w-7xl mx-auto">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-heading text-theme-primary mb-4 font-bold">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="font-body text-theme hover:text-theme-accent transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/allitems"
                  className="font-body text-theme hover:text-theme-accent transition-colors duration-300"
                >
                  All Items
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="font-body text-theme hover:text-theme-accent transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="font-body text-theme hover:text-theme-accent transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="text-lg font-heading text-theme-primary mb-4 font-bold">
              Stay Updated
            </h3>
            <p className="font-body text-theme-secondary mb-4">
              Subscribe to our newsletter for the latest book releases and
              offers.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-l-md bg-theme-neutral text-theme focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-300"
                disabled
              />
              <button
                className="bg-theme-accent text-theme px-4 py-2 rounded-r-md hover:bg-theme-primary hover:text-theme-neutral transition-all duration-300"
                disabled
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-heading text-theme-primary mb-4 font-bold">
              Connect With Us
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme hover:text-theme-accent transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme hover:text-theme-accent transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-theme hover:text-theme-accent transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
            <p className="font-body text-theme">
              Email: support@cozybookshop.com
            </p>
            <p className="font-body text-theme">Phone: (123) 456-7890</p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-theme-neutral text-center">
          <p className="font-body text-theme-secondary text-sm">
            &copy; {new Date().getFullYear()} Cozy Bookshop. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
