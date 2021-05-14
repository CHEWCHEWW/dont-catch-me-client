import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomID: "",
  players: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setNewRoom(state, { payload: { roomID } }) {
      state.roomID = roomID;
    }
  },
});

export const { setNewRoom } = roomSlice.actions;

export const userInfoSelector = ({ room }) => socket.userInfo;

export default roomSlice.reducer;
