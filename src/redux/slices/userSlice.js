import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userName: "",
  userID: "",
  isReady: false,
  roll: "rabbit",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    enterPlayer(state, { payload: { userID } }) {
      state.userID = userID;
    },
  },
});

export const { enterRoom } = userSlice.actions;

export const userInfoSelector = ({ user }) => user;

export default userSlice.reducer;
