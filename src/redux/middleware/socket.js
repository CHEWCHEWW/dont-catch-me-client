import { io } from "socket.io-client";

import { createRoomSuccess, joinUserSuccess } from "../slices/multiplaySlice";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("createRoomSuccess", ({ creatorId, roomId }) => {
      store.dispatch(createRoomSuccess({ creatorId, roomId }));
    });

    socket.on("joinUserSuccess", ({ members, creatorId, userId, roomId }) => {
      console.log(3000);
      store.dispatch(joinUserSuccess({ creatorId, members, userId, roomId }));
    });

    socket.on("error", ({ message }) => {
      console.log(message);
    });

    return (next) => (action) => {
      const [type, actionName] = action.type.split("/");

      if (type !== "single") {
        socket.emit(actionName, action.payload);
      }

      return next(action);
    };
  };
};

export default socketMiddleware;
