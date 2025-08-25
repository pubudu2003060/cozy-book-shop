import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isLogedIn: false,
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    logedIn: (state) => {
      state.isLogedIn = true;
    },
    logedOut: (state) => {
      state.isLogedIn = false;
    },
    addUserData: (state, ation) => {
      state.data = ation.payload;
    },
    updateUserData: (state, action) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload };
      }
    },
    removeData: (state) => {
      state.data = null;
    },
  },
});

export const { logedIn, logedOut, addUserData, updateUserData, removeData } =
  userSlice.actions;
export default userSlice.reducer;
