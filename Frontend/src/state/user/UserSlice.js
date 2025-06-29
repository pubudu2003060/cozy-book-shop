import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  isLogedIn: false,
  name: "",
  email: "",
  id: "",
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
  },
});

export const { logedIn, logedOut } = userSlice.actions;
export default userSlice.reducer;
