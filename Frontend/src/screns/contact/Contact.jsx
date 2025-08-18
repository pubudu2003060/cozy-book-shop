import React, { useState } from "react";
import { Link } from "react-router-dom";
import { freeAxios } from "../../api/Axios";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("All fields are required");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Invalid email format");
      return;
    }

    try {
      const response = await freeAxios.post(
        "http://localhost:5000/api/email/sendemail",
        form
      );

      const data = response.data;
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError("Failed to send message, try again later.");
      }
    } catch (err) {
      console.error(err);
      setError("Error sending message.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] pb-10 bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          Contact Us
        </h2>
        <div className="bg-neutral-50 dark:bg-[#2d251f] p-6 rounded-lg shadow-md border border-neutral-200 dark:border-[#3d342a]">
          <div className="space-y-4 font-body text-amber-700 dark:text-amber-200 mb-6">
            <p>
              We’d love to hear from you! Whether you have questions about our
              books, need help with an order, or want to share your love for
              reading, feel free to reach out.
            </p>
            <p>
              <strong>Address:</strong> 123 Story Lane, Booktown, BT 12345
            </p>
            <p>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@cozybookshop.com"
                className="text-orange-600 dark:text-orange-500 hover:underline"
              >
                info@cozybookshop.com
              </a>
            </p>
            <p>
              <strong>Phone:</strong>{" "}
              <a
                href="tel:+1234567890"
                className="text-orange-600 dark:text-orange-500 hover:underline"
              >
                (123) 456-7890
              </a>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            {error && (
              <p className="text-red-500 font-body mb-4 text-center">{error}</p>
            )}
            {success && (
              <p className="text-green-500 font-body mb-4 text-center">
                Message sent successfully!
              </p>
            )}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block font-body text-amber-700 dark:text-amber-200 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white dark:bg-[#1a1611] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-[#3d342a] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 transition-colors"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block font-body text-amber-700 dark:text-amber-200 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white dark:bg-[#1a1611] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-[#3d342a] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 transition-colors"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="block font-body text-amber-700 dark:text-amber-200 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-white dark:bg-[#1a1611] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-[#3d342a] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 transition-colors resize-y"
                placeholder="Your message"
                rows="5"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-md hover:bg-green-800 dark:hover:bg-green-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
