import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    setLogin: function (state) {
      state.isLogin = !state.isLogin;
    },
  },
});
export const { setLogin } = authSlice.actions;
export default authSlice.reducer;
