import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  roomId: "",
  creatorId: "",
  progress: gameProgress.GAME_BEFORE_START,
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    createRoomSuccess(state, { payload: { roomId, creatorId } }) {
      state.creatorId = creatorId;
      state.roomId = roomId;
    },
    enterRoom(state, { payload: { roomId } }) {
      state.roomId = roomId;
    },
  },
});

export const { createRoomSuccess, enterRoom } = roomSlice.actions;

export const makeNewRoom = createAction("room/makeNewRoom");

export default roomSlice.reducer;
