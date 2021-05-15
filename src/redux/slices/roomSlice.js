import { createSlice, createAction } from "@reduxjs/toolkit";

const initialState = {
  roomId: "",
  creatorId: "",
  players: [],
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
