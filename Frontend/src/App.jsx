import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./screns/home/Home";
import SignIn from "./screns/signin/SignIn";
import SignUp from "./screns/signup/SignUp";
import Item from "./screns/item/Item";
import Cart from "./screns/cart/Cart";
import AllItems from "./screns/all items/AllItems";
import About from "./screns/about/About";
import Contact from "./screns/contact/Contact";
import { ToastContainer } from "react-toastify";

const App = () => {
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
            <Route path="signup" element={<SignUp />} />
          </Route>
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
