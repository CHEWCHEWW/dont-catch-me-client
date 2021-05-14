import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomList: [],
  currentRoom: {
    players: [],
    roomName: "",
    roomID: "",
    state: "",
  },
  userName: "",
  userID: "",
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    enterRoom() {},
    makeNewRoom(state, { payload: { roomName, roomID } }) {
      state.currentRoom.roomName = roomName;
      state.currentRoom.roomID = roomID;
    },
    joinNewPlayer(state, { payload }) {
      state.currentRoom.players.concat(payload);
    },

  },
});

export const { makeNewRoom, joinNewPlayer } = socketSlice.actions;

export default socketSlice.reducer;
