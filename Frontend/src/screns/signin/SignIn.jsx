import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { freeAxios, JWTAxios } from "../../api/Axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logedIn } from "../../state/user/UserSlice";
import googleimage from "../../assets/icons8-google-48.png";

const SignIn = () => {
  const dispatch = useDispatch();
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
      const responce = await freeAxios.post("/auth/signin", {
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

        dispatch(logedIn());
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

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/googlesignin";
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

        dispatch(logedIn());
        navigate("/", { replace: true });
      }
    };

    googleSignin();
  }, [paramValueStatus, tokenValue]);

  return (
    <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-theme-neutral p-6 rounded-lg shadow-lg border border-theme-secondary">
        <h2 className="text-2xl md:text-3xl font-heading text-theme-primary mb-6 text-center font-bold">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              htmlFor="password"
              className="block font-body text-theme-secondary mb-2 font-medium"
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
              className="w-full px-4 py-2 bg-theme text-theme border border-theme-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all duration-300"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-theme-primary text-theme-neutral px-4 py-2 rounded-md hover:bg-theme-accent hover:text-theme font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-theme-primary transform hover:scale-105"
          >
            Sign In
          </button>
        </form>

        <div className="mt-5">
          <p className="text-theme-secondary">
            I dont have an account.{" "}
            <Link
              to="/signup"
              className="text-theme-accent hover:text-theme-primary transition-colors duration-300 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-5 flex items-center justify-center gap-3 p-2">
          <p className="text-theme-secondary">Sign in with Google</p>
          <button
            onClick={handleGoogleLogin}
            className="hover:scale-110 transition-transform duration-300"
          >
            <img src={googleimage} alt="Google Sign In" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
