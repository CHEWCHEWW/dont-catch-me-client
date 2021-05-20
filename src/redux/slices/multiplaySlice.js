import { createSlice, createAction } from "@reduxjs/toolkit";

import { gameProgress } from "../../constants/gameState";

const initialState = {
  room: {
    roomId: "",
    creatorId: "",
    players: {},
    progress: gameProgress.GAME_BEFORE_START,
    isAllUsersReady: false,
  },
  user: {
    username: "",
    userId: "",
    isReady: false,
    role: "rabbit",
    isWin: false,
  },
};

const multiSlice = createSlice({
  name: "multiple",
  initialState,
  reducers: {
    resetGame(state) {
      console.log(state);
      state = initialState;
    },
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
      room.progress = gameProgress.GAME_OVER;
      user.isWin = isWin;
    }
  },
});

export const {
  resetGame,
  joinUserSuccess,
  createRoomSuccess,
  changeSomeUserState,
  changeMyState,
  updateGameProgress,
  updateGameResult,
} = multiSlice.actions;

export const makeNewRoom = createAction("multiple/makeNewRoom");
export const enterRoom = createAction("multiple/enterRoom");
export const changeReadyState = createAction("multiple/changeReadyState");

export const gameProgressSelector = ({ multiple }) => multiple.room.progress;

export default multiSlice.reducer;
