import React, { createContext, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./screns/home/Home";
import SignIn from "./screns/signin/SignIn";
import SignUp from "./screns/signup/SignUp";
import Item from "./screns/item/Item";
import Cart from "./screns/cart/Cart";
import AllItems from "./screns/all items/AllItems";
import About from "./screns/about/About";
import Contact from "./screns/contact/Contact";
import { toast, ToastContainer } from "react-toastify";
import { JWTAxios } from "./api/Axios";
import { useDispatch } from "react-redux";
import { logedIn, logedOut } from "./state/user/UserSlice";

const App = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);

    const checkLogin = async () => {
      try {
        const responce = await JWTAxios.get("/user/isloged");
        if (responce.data.success) {
          dispatch(logedIn());
        } else {
          toast.error("Login to your account", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          dispatch(logedOut());
        }
      } catch (error) {
        console.log("This is not a authenticated user");
      }
    };

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      checkLogin();
    } else {
      toast.error("Login to your account", {
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

    setLoading(false);
  }, []);

  return loading ? (
    <div className="min-h-[calc(100vh)] bg-[oklch(0.95_0.01_280)] dark:bg-[oklch(0.25_0.02_280)] flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-t-[oklch(0.75_0.17_85)] dark:border-t-[oklch(0.8_0.17_85)] border-[oklch(0.55_0.03_256)] dark:border-[oklch(0.7_0.03_256)]"></div>
        <p className="mt-4  text-lg text-[oklch(0.2_0.03_260)] dark:text-[oklch(0.9_0.01_260)]">
          Loading...
        </p>
      </div>
    </div>
  ) : (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="allitems" element={<AllItems />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="item/:id" element={<Item />} />
            <Route path="cart" element={<Cart />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default App;
