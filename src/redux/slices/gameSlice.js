import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  progress: gameProgress.GAME_BEFORE_START,
  username: "",
  score: "",
  clearTime: "",
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameProgress(state, { payload }) {
      console.log(payload);
      state.progress = payload;
    },
    sendSocketMessage(state, { payload }) {
      state.score = payload;
    }
  },
});

export const { updateGameProgress, sendSocketMessage } = gameSlice.actions;

export const gameProgressSelector = ({ game }) => game;

export default gameSlice.reducer;
