import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isSignup: false,
  },
  reducers: {
    setLogin: function (state) {
      state.isSignup = !state.isSignup;
    },
  },
});
export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
