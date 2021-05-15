import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  roomState: {
    roomId: "",
    creatorId: "",
    players: [],
    progress: gameProgress.GAME_BEFORE_START,
  },
  userState: {
    username: "",
    userId: "",
    isReady: false,
    role: "rabbit",
  },
};

const multiSlice = createSlice({
  name: "multiple",
  initialState,
  reducers: {
    joinUserSuccess(state, { payload: { members, creatorId, userId, roomId } }) {
      state.userState.userId = userId;
      state.roomState.players = members;
      state.roomState.creatorId = creatorId;
      state.roomState.roomId = roomId;
    },
    createRoomSuccess(state, { payload: { roomId, creatorId } }) {
      state.creatorId = creatorId;
      state.roomId = roomId;
    },
  },
});

export const { joinUserSuccess, createRoomSuccess } = multiSlice.actions;

export const makeNewRoom = createAction("room/makeNewRoom");
export const enterRoom = createAction("room/enterRoom");

export default multiSlice.reducer;
