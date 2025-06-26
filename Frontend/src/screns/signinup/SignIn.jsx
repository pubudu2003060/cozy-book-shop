import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { freeAxios } from "../../api/Axios";
import { useNavigate } from "react-router-dom";
import { signinContext } from "../../App";

const SignIn = () => {
  const { isLogin, setIsLogin } = useContext(signinContext);

  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responce = await freeAxios.post("/user/signin", {
        email: form.email,
        password: form.password,
      });

      if (responce.data.status) {
        localStorage.setItem("accessToken", responce.data.accessToken);

        toast.success("User signed in successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        setForm({
          email: "",
          password: "",
        });
        setIsLogin(true);
        navigate("/");
      } else {
        toast.error("User signed in fail", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("User signed In error:", error);
      toast.error("Error signIn user", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          Sign In
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-neutral-50 dark:bg-[#2d251f] p-6 rounded-lg shadow-md border border-neutral-200 dark:border-[#3d342a]"
        >
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
              htmlFor="password"
              className="block font-body text-amber-700 dark:text-amber-200 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white dark:bg-[#1a1611] text-neutral-900 dark:text-neutral-100 border border-neutral-200 dark:border-[#3d342a] rounded-md focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-600 dark:bg-orange-500 text-neutral-100 dark:text-neutral-900 px-4 py-2 rounded-md hover:bg-green-800 dark:hover:bg-green-700 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-700"
          >
            Sign In
          </button>
        </form>
      </div>
    </main>
  );
};

export default SignIn;
