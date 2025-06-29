import { configureStore } from "@reduxjs/toolkit";
import booksliceREducer from "./book/Bookslice";
import userReduser from "./user/UserSlice";

const Store = configureStore({
  reducer: {
    book: booksliceREducer,
    user: userReduser,
  },
});

export default Store;
