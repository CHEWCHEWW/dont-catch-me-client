import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger"

import game from "./redux/slices/gameSlice";

const store = configureStore({
  reducer: {
    game
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
