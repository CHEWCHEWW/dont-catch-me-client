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
    joinUserSuccess({ userState, roomState }, { payload: { members, creatorId, userId, roomId, username } }) {
      userState.userId = userId;
      userState.username = username;
      roomState.players = members;
      roomState.creatorId = creatorId;
      roomState.roomId = roomId;
    },
    createRoomSuccess({ roomState }, { payload: { roomId, creatorId } }) {
      roomState.creatorId = creatorId;
      roomState.roomId = roomId;
    },
    changeSomeUserState({ roomState }, { payload: { players } }) {
      roomState.players = players;
    },
    changeMyState({ userState }, { payload: { username, isReady, role } }) {
      userState.username = username;
      userState.isReady = isReady;
      userState.role = role;
    }
  },
});

export const { joinUserSuccess, createRoomSuccess, changeSomeUserState, changeMyState } = multiSlice.actions;

export const makeNewRoom = createAction("room/makeNewRoom");
export const enterRoom = createAction("room/enterRoom");
export const changeReadyState = createAction("room/changeReadyState");

export default multiSlice.reducer;
