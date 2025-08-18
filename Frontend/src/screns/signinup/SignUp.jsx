import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { freeAxios } from "../../api/Axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logedIn } from "../../state/user/UserSlice";
import googleimage from "../../assets/icons8-google-48.png";

const SignUp = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getCartLength = async () => {
    try {
      const responce = await JWTAxios.get("/cart/getcartsize");
      if (responce.data.status) {
        dispatch(increaseCountByAmount(responce.data.length));
      } else {
      }
    } catch (error) {
      console.log("Error in get cart size: ", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast.error("Please enter same password.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    }
    try {
      const responce = await freeAxios.post("/user/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      if (responce.data.status) {
        localStorage.setItem("accessToken", responce.data.accessToken);

        toast.success("User signed up successfully", {
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
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        getCartLength();
        dispatch(logedIn());
        navigate("/");
      } else {
        toast.error("User signed up fail", {
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
      console.error("User signed up error:", error);
      toast.error("Error signup user", {
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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/user/googlesignin";
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const paramValueStatus = searchParams.get("status");
  const tokenValue = searchParams.get("accessToken");

  useEffect(() => {
    const googleSignin = () => {
      if (!paramValueStatus) return;

      if (paramValueStatus === "fail") {
        toast.error("User signed in failed", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        navigate("/signin", { replace: true });
      }

      if (paramValueStatus === "success" && tokenValue) {
        localStorage.setItem("accessToken", tokenValue);
        toast.success("User signed in successfully", {
          position: "top-center",
          autoClose: 5000,
          theme: "dark",
        });
        getCartLength();
        dispatch(logedIn());
        navigate("/", { replace: true });
      }
    };

    googleSignin();
  }, [paramValueStatus, tokenValue]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-white dark:bg-[#1a1611] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-neutral-50 dark:bg-[#2d251f] p-6 rounded-lg shadow-md border border-neutral-200 dark:border-[#3d342a]">
        <h2 className="text-2xl md:text-3xl font-heading text-neutral-900 dark:text-neutral-100 mb-6 text-center">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit}>
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
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block font-body text-amber-700 dark:text-amber-200 mb-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
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
            Sign Up
          </button>
        </form>

        <div className="mt-5">
          <p className=" text-amber-700 dark:text-amber-200">
            I alrady have an accout. <Link to="/signin">Sign in</Link>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-2  p-2">
          <p className="text-amber-700 dark:text-amber-200">
            Sign up with Google
          </p>
          <button onClick={handleGoogleLogin}>
            <img src={googleimage} alt="Google Sign In" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignUp;
