import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    chatInfo: false
};


export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    openChatInfo: (state, action) => {
        state.chatInfo = action.payload;
    },
  },
});

export const { openChatInfo } = appSlice.actions;
export const selectChatInfo = (state) => state.app.chatInfo;

export default appSlice.reducer;