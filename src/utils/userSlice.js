import { createSlice } from "@reduxjs/toolkit";
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    currentRoom: null,
  },
  reducers: {
    addUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    removeUser: (state, action) => {
      state.removeUser = null;
    },
    addRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});
export const { addUserInfo, removeUser, addRoom } = userSlice.actions;
export default userSlice.reducer;
