import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  userId: "",
  isReady: false,
  roll: "rabbit",
};

const multiSlice = createSlice({
  name: "multiple",
  initialState,
  reducers: {
    enterPlayer(state, { payload: { userId } }) {
      state.userId = userId;
    },
  },
});

export const { enterPlayer } = multiSlice.actions;

export default multiSlice.reducer;
