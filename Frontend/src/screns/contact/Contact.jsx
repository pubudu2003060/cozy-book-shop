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
  const [sending, setSending] = useState(false);

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
      setSending(true);
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
      setSending(false);
    } catch (err) {
      setSending(fal);
      console.error(err);
      setError("Error sending message.");
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] pb-10 bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-heading text-theme-primary mb-6 text-center font-bold">
          Contact Us
        </h2>
        <div className="bg-theme-neutral p-6 rounded-lg shadow-lg border border-theme-secondary">
          <div className="space-y-4 font-body text-theme mb-6">
            <p>
              We'd love to hear from you! Whether you have questions about our
              books, need help with an order, or want to share your love for
              reading, feel free to reach out.
            </p>
            <div className="space-y-2">
              <p>
                <strong className="text-theme-primary">Address:</strong> 123
                Story Lane, Booktown, BT 12345
              </p>
              <p>
                <strong className="text-theme-primary">Email:</strong>{" "}
                <a
                  href="mailto:info@cozybookshop.com"
                  className="text-theme-accent hover:text-theme-primary transition-colors duration-300 hover:underline"
                >
                  info@cozybookshop.com
                </a>
              </p>
              <p>
                <strong className="text-theme-primary">Phone:</strong>{" "}
                <a
                  href="tel:+1234567890"
                  className="text-theme-accent hover:text-theme-primary transition-colors duration-300 hover:underline"
                >
                  (123) 456-7890
                </a>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <p className="text-red-500 font-body text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600 dark:text-green-400 font-body text-center bg-green-50 dark:bg-green-900/20 p-3 rounded-md border border-green-200 dark:border-green-800">
                Message sent successfully!
              </p>
            )}
            <div>
              <label
                htmlFor="name"
                className="block font-body text-theme-secondary mb-2 font-medium"
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
                className="w-full px-4 py-2 bg-theme text-theme border border-theme-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-300"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block font-body text-theme-secondary mb-2 font-medium"
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
                className="w-full px-4 py-2 bg-theme text-theme border border-theme-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-300"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block font-body text-theme-secondary mb-2 font-medium"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-theme text-theme border border-theme-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-300 resize-y"
                placeholder="Your message"
                rows="5"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-theme-accent text-theme px-4 py-3 rounded-md hover:bg-theme-primary hover:text-theme-neutral font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105"
              disabled={sending}
            >
              {sending ? "Sending" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Contact;
