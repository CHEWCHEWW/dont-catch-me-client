import { createSlice } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  progress: gameProgress.BEFORE_START,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    updateGameProgress(state, action) {
      state.progress = action.payload;
    }
  },
});

export const { updateGameProgress } = gameSlice.actions;
export default gameSlice.reducer;
