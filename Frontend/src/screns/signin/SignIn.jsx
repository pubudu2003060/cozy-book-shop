import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { freeAxios, JWTAxios } from "../../api/Axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logedIn, logedOut } from "../../state/user/UserSlice";
import { useAuth0 } from "@auth0/auth0-react";
import { removeDatafromCart, resetCartCount } from "../../state/cart/CartSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const paramValueStatus = searchParams.get("status");
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, logout } =
    useAuth0();
  const isLogin = useSelector((state) => state.user.isLogedIn);

  const login = async () => {
    await loginWithRedirect();
  };

  const logoutUser = async () => {
    if (isLogin) {
      dispatch(logedOut());
      dispatch(resetCartCount());
      dispatch(removeDatafromCart());
      localStorage.removeItem("accessToken");
      await logout();
    }
  };

  useEffect(() => {
    const checkStatus = async () => {
      if (paramValueStatus === "login") {
        login();
      } else if (paramValueStatus === "logout") {
        logoutUser();
      } else {
        console.log("Checking user authentication...");

        if (isAuthenticated) {
          dispatch(logedIn());
          const token = await getAccessTokenSilently();
          localStorage.setItem("accessToken", token);
        } else {
          dispatch(logedOut());
        }
      }
    };

    checkStatus();

    const timer = setTimeout(() => {
      navigate("/");
    }, 1000);

    return () => clearTimeout(timer);
  }, [paramValueStatus, isAuthenticated]);

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

  return (
    <main className="min-h-[calc(100vh-80px)] bg-theme flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-[oklch(0.75_0.17_85)] dark:border-t-[oklch(0.8_0.17_85)] border-[oklch(0.55_0.03_256)] dark:border-[oklch(0.7_0.03_256)]"></div>
        <p className="mt-4  text-lg text-[oklch(0.2_0.03_260)] dark:text-[oklch(0.9_0.01_260)]">
          Loading...
        </p>
      </div>
    </main>
  );
};

export default SignIn;
