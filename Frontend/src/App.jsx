import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./screns/home/Home";
import SignIn from "./screns/signin/SignIn";
import Item from "./screns/item/Item";
import Cart from "./screns/cart/Cart";
import AllItems from "./screns/all items/AllItems";
import About from "./screns/about/About";
import Contact from "./screns/contact/Contact";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const { isAuthenticated } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated) localStorage.removeItem("accessToken");
    console.log("Authentication status changed:", isAuthenticated);
  }, [isAuthenticated]);

  return (
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
