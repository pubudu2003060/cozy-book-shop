import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalOrders: 0,
  orders: null,
};

const orderScice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setTotalOrders: (state, action) => {
      state.totalOrders = action.payload;
    },
    setOrderItemCancelById: (state, action) => {
      const orderId = action.payload;
      if (state.orders) {
        state.orders = state.orders.map((order) => {
          if (order.id === orderId) {
            return { ...order, status: "Cancelled" };
          }
          return order;
        });
      }
    },
  },
});

export const { setOrders, setTotalOrders, setOrderItemCancelById } =
  orderScice.actions;
export default orderScice.reducer;
