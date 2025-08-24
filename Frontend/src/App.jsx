import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./screns/home/Home";
import Item from "./screns/item/Item";
import Cart from "./screns/cart/Cart";
import AllItems from "./screns/all items/AllItems";
import About from "./screns/about/About";
import Contact from "./screns/contact/Contact";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { freeAxios } from "./api/Axios";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, logedIn, logedOut } from "./state/user/UserSlice";
import Checkout from "./screns/checkout/Checkout";
import Profile from "./screns/profile/profile";

const App = () => {
  const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.user.isLogedIn);

  const handlelogin = async () => {
    try {
      const token = await getAccessTokenSilently();

      const userInfo = await axios.get(
        "https://dev-zg2zh4fjwx56n2jo.us.auth0.com/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const userdata = userInfo.data;

      const responce = await freeAxios.post(
        "/auth/login",
        {
          email: userdata.email,
          name: userdata.name,
          picture: userdata.picture,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (responce.data.status) {
        toast.success("User login successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

        localStorage.setItem("userId", responce.data.id);
        localStorage.setItem("accessToken", token);
        dispatch(logedIn());
        dispatch(addUserData(responce.data.user));
        console.log(responce.data.user);
      } else {
        toast.error("User login fail", {
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
      toast.error("Error login user", {
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

  useEffect(() => {
    const fetchAuthStatus = async () => {
      if (!isAuthenticated && isLoading) {
        localStorage.removeItem("userId");
        localStorage.removeItem("accessToken");
        dispatch(logedOut());
      } else {
        handlelogin();
      }
    };

    fetchAuthStatus();
  }, [isAuthenticated]);

  return (
    <>
      {isLoading && !islogin && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 fixed top-0 left-0 w-full z-50">
          <div className="text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-t-4 border-white border-opacity-20 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome</h1>
            <p className="text-white">Loading your experience...</p>
          </div>
        </div>
      )}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="allitems" element={<AllItems />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="item/:id" element={<Item />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="profile" element={<Profile />} />
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
