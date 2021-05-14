import { io } from "socket.io-client";

import { sendSocketMessage } from "../slices/gameSlice";

const socketMiddleware = (url) => {
  console.log(300);
  return (store) => {
    const socket = io.connect(url);
    socket.emit("test", { message: "24" });
    socket.on("success", (message) => {
      console.log(message);
      store.dispatch(sendSocketMessage("happy"));
    });

    return (next) => (action) => {
      if (action.type === "SEND") {
        socket.emit(action.payload);
      }
      
      return next(action);
    };
  };
};

export default socketMiddleware;
