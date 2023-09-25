import { createSlice } from "@reduxjs/toolkit";
const chat = createSlice({
  name: "chat",
  initialState: { isShownChatScreen: false },
  reducers: {
    setChatScreen: (state, action) => {
      state.isShownChatScreen = !state.isShownChatScreen;
    },
  },
});
export const { setChatScreen } = chat.actions;
export default chat.reducer;
