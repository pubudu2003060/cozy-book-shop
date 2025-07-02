import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialState,
  reducers: {
    addBooks: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addBooks } = bookSlice.actions;
export default bookSlice.reducer;
