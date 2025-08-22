import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-theme-neutral p-6 rounded-lg shadow-lg border border-theme-secondary">
        <h2 className="text-2xl md:text-3xl font-heading text-theme-primary mb-6 text-center font-bold">
          About Cozy Bookshop
        </h2>
        <div className="space-y-4 font-body text-theme">
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
            className="inline-block bg-theme-accent text-theme px-6 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105"
          >
            Browse Our Books
          </Link>
        </div>
      </div>
    </main>
  );
};

export default About;
