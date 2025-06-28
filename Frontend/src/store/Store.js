import { configureStore } from "@reduxjs/toolkit";
import booksliceREducer from "../store/Bookslice";

const Store = configureStore({
  reducer: {
    book: booksliceREducer,
  },
});

export default Store;
