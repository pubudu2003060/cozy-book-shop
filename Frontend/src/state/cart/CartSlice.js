import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  itemCount: 0,
  data: [],
};

const CartSCice = createSlice({
  name: "Cart",
  initialState: initialCartState,
  reducers: {
    increaseCountByOne: (state) => {
      state.itemCount += 1;
    },
    increaseCountByAmount: (state, action) => {
      state.itemCount += action.payload;
    },
    resetCartCount: (state) => {
      state.itemCount = 0;
    },
    addDatatoCart: (state, action) => {
      state.data = action.payload;
    },
    removeDatafromCart: (state, action) => {
      state.data = [];
    },
    increaseCartItemAmountByid: (state, action) => {
      state.data = state.data.map((item) =>
        item.bookId._id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    },
    decreaseCartItemAmountByid: (state, action) => {
      state.data = state.data.map((item) =>
        item.bookId._id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    },
  },
});

export const {
  increaseCountByAmount,
  increaseCountByOne,
  resetCartCount,
  addDatatoCart,
  increaseCartItemAmountByid,
  decreaseCartItemAmountByid,
  removeDatafromCart,
} = CartSCice.actions;
export default CartSCice.reducer;
