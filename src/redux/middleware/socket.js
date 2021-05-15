import { io } from "socket.io-client";

import { createRoomSuccess } from "../slices/roomSlice";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("createRoomSuccess", ({ creatorId, roomId }) => {
      console.log(creatorId, roomId);
      store.dispatch(createRoomSuccess({ creatorId, roomId }));
    });

    return (next) => (action) => {
      const [type, actionName] = action.type.split("/");

      if (type !== "game") {
        socket.emit(actionName, action.payload);
      }

      return next(action);
    };
  };
};

export default socketMiddleware;
