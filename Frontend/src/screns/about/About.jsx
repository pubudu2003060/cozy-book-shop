import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-neutral-50 dark:bg-[#2d251f] p-6 rounded-lg shadow-md border border-neutral-200 dark:border-[#3d342a]">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          About Cozy Bookshop
        </h2>
        <div className="space-y-4 font-body text-amber-700 dark:text-amber-200">
          <p>
            Welcome to Cozy Bookshop, a haven for book lovers since 2010.
            Nestled in the heart of our community, we are dedicated to fostering
            a love for literature through our carefully curated collection of
            books, from timeless classics to contemporary bestsellers.
          </p>
          <p>
            Our mission is to create a warm, inviting space where readers of all
            ages can discover stories that inspire, educate, and entertain.
            Whether you're seeking a gripping novel, a thought-provoking
            non-fiction title, or a delightful children's book, our shelves are
            filled with treasures waiting to be explored.
          </p>
          <p>
            At Cozy Bookshop, we believe in the power of stories to connect
            people. Our team is passionate about recommending the perfect book
            and hosting community events like book clubs, author readings, and
            literary discussions. We strive to be more than just a
            bookstore—we're a place where ideas flourish and friendships form.
          </p>
          <p>
            Visit us in-store or browse our online collection to find your next
            great read. Thank you for supporting our small, independent
            bookshop!
          </p>
        </div>
        <div className="mt-6 text-center">
          <Link
            to="/allitems"
            className="inline-block bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-md hover:bg-green-800 dark:hover:bg-green-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
          >
            Browse Our Books
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About;
