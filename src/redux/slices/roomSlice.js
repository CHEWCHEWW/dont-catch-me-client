import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomID: "",
  creator: "",
  players: [],
};

const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setNewRoom(state, { payload: { roomID, creator } }) {
      state.roomID = roomID;
      state.creator = creator;
    }
  },
});

export const { setNewRoom } = roomSlice.actions;

export const userInfoSelector = ({ room }) => socket.userInfo;

export default roomSlice.reducer;
