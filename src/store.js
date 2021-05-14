import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import logger from "redux-logger"

import game from "./redux/slices/gameSlice"; 
import socket from "./redux/slices/socketSlice";
import socketMiddleware from "./redux/middleware/socket";

const store = configureStore({
  reducer: {
    game,
    socket,
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
