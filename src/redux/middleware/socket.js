import { io } from "socket.io-client";

import { sendSocketMessage } from "../slices/socketSlice";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("somePlayerJoin", (message) => {
      console.log(socket.id);
      store.dispatch(sendSocketMessage(message));
    });

    return (next) => (action) => {
      const [type, actionName] = action.type.split("/");

      if (type === "socket") {
        socket.emit(actionName, action.payload);
      }

      return next(action);
    };
  };
};

export default socketMiddleware;
