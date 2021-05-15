import { createSlice } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  progress: gameProgress.GAME_BEFORE_START,
  username: "",
  score: "",
  clearTime: "",
};

const singlePlaySlice = createSlice({
  name: "single",
  initialState,
  reducers: {
    updateGameProgress(state, { payload }) {
      state.progress = payload;
    },
  },
});

export const { updateGameProgress } = singlePlaySlice.actions;

export const gameProgressSelector = ({ single }) => single;

export default singlePlaySlice.reducer;
