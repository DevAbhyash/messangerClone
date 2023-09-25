import { createSlice } from "@reduxjs/toolkit";
const accountSetting = createSlice({
  name: "accountSetting",
  initialState: {
    isSettingShown: false,
    toggleSetProfilePicture: false,
  },
  reducers: {
    toggleAccountShow: function (state, action) {
      state.isSettingShown = !state.isSettingShown;
    },
    toggleChangeProfilePicture: function (state, action) {
      state.toggleSetProfilePicture = !state.toggleSetProfilePicture;
    },
  },
});
export const { toggleAccountShow, toggleChangeProfilePicture } =
  accountSetting.actions;
export default accountSetting.reducer;
