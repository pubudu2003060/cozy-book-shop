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
  },
});

export const { increaseCountByAmount, increaseCountByOne, resetCartCount } =
  CartSCice.actions;
export default CartSCice.reducer;
