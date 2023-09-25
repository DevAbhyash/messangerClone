import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import userSlice from "./userSlice";
import accountSetting from "./AccountSetting";
import chatScreen from "./chat";
const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    accountSetting: accountSetting,
    chat: chatScreen,
  },
});
export default store;
