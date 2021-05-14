import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"

import game from "./redux/slices/gameSlice"; 
import user from "./redux/slices/userSlice";
import room from "./redux/slices/roomSlice";
import socketMiddleware from "./redux/middleware/socket";

const store = configureStore({
  reducer: {
    game,
    user,
    room,
  },
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV !== "production") {
      return getDefaultMiddleware().concat([logger, socketMiddleware(process.env.SERVER_PORT)]);
    }

    return getDefaultMiddleware().concat([logger, socketMiddleware(process.env.SERVER_PORT)]);
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
