import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  room: {
    roomId: "",
    creatorId: "",
    players: {},
    progress: gameProgress.GAME_BEFORE_START,
  },
  user: {
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
    joinUserSuccess(
      { user, room },
      { payload: { members, creatorId, userId, roomId, username } }
    ) {
      user.userId = userId;
      user.username = username;
      room.players = members;
      room.creatorId = creatorId;
      room.roomId = roomId;
    },
    createRoomSuccess({ room }, { payload: { roomId, creatorId } }) {
      room.creatorId = creatorId;
      room.roomId = roomId;
    },
    changeSomeuser({ room }, { payload: { players } }) {
      room.players = players;
    },
    changeMyState({ user }, { payload: { username, isReady, role } }) {
      user.username = username;
      user.isReady = isReady;
      user.role = role;
    },
    updateGameProgress({ room }, { payload }) {
      room.progress = payload;
    },
  },
});

export const {
  joinUserSuccess,
  createRoomSuccess,
  changeSomeuser,
  changeMyState,
  updateGameProgress,
} = multiSlice.actions;

export const makeNewRoom = createAction("multiple/makeNewRoom");
export const enterRoom = createAction("multiple/enterRoom");
export const changeReadyState = createAction("multiple/changeReadyState");

export default multiSlice.reducer;
