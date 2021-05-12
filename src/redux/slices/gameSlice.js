import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  progress: gameProgress.GAME_BEFORE_START,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameProgress(state, { payload }) {
      state.progress = payload;
    }
  },
});

export const { updateGameProgress } = gameSlice.actions;

export const gameProgressSelector = ({ game }) => game;

export default gameSlice.reducer;
