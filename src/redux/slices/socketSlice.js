import { createSlice } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  message: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    sendSocketMessage(state, { payload }) {
      state.message = payload;
    }
  },
});

export const { sendSocketMessage } = socketSlice.actions;

export default socketSlice.reducer;
