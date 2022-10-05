import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatInfo: false, //chat info container open state
    user: null, //user info from google
    userData: null, //user info from firestore
    selectedChat: null, //selected chat
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openChatInfo: (state, action) => {
      state.chatInfo = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
    setSelectedChat: (state, action) => {
      state.selectedChat = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    }
  },
});

export const { openChatInfo, updateUser, setSelectedChat, setUserData } = appSlice.actions;
export const selectChatInfo = (state) => state.app.chatInfo;
export const selectUser = (state) => state.app.user;
export const selectedChat = (state) => state.app.selectedChat;
export const selectUserData = (state) => state.app.userData;

export default appSlice.reducer;