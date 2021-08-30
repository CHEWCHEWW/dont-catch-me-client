import { createSlice, createAction } from "@reduxjs/toolkit";

import { GAME_PROGRESS } from "../../constants/game";

const initialState = {
  room: {
    roomId: "",
    creatorId: "",
    players: {},
    progress: GAME_PROGRESS.GAME_BEFORE_START,
    isAllUsersReady: false,
  },
  user: {
    username: "",
    userId: "",
    isReady: false,
    role: "rabbit",
    isWin: false,
    x: 0,
    y: 0,
  },
};

const multiSlice = createSlice({
  name: "multiple",
  initialState,
  reducers: {
    leaveSomeUser({ room }, { payload: { id } }) {
      delete room.players[id];
    },
    joinUserSuccess(
      { user, room },
      { payload: { members, creatorId, userId, roomId, username, userInformation } }
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
    changeSomeUserState({ room }, { payload: { players } }) {
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
    updateGameResult({ room, user }, { payload: { isWin } }) {
      room.progress = GAME_PROGRESS.GAME_OVER;
      user.isWin = isWin;
    },
    startGame({ room }) {
      room.progress = GAME_PROGRESS.GAME_START;
    },
    leaveRoom() {
      return initialState;
    }
  },
});

export const {
  leaveRoom,
  joinUserSuccess,
  createRoomSuccess,
  changeSomeUserState,
  changeMyState,
  leaveSomeUser,
  updateGameProgress,
  updateGameResult,
  startGame,
} = multiSlice.actions;

export const makeNewRoom = createAction("multiple/makeNewRoom");
export const enterRoom = createAction("multiple/enterRoom");
export const changeReadyState = createAction("multiple/changeReadyState");

export const gameProgressSelector = ({ multiple }) => multiple.room.progress;

export default multiSlice.reducer;
