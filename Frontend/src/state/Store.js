import { configureStore } from "@reduxjs/toolkit";
import booksliceREducer from "./book/Bookslice";
import userReduser from "./user/UserSlice";
import cartReduser from "./cart/CartSlice";

const Store = configureStore({
  reducer: {
    book: booksliceREducer,
    user: userReduser,
    cart: cartReduser,
  },
});

export default Store;
