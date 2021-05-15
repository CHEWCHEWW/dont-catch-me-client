import { io } from "socket.io-client";

import { createRoomSuccess, joinUserSuccess, changeSomeUserState, changeMyState } from "../slices/multiplaySlice";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("createRoomSuccess", ({ creatorId, roomId }) => {
      store.dispatch(createRoomSuccess({ creatorId, roomId }));
    });

    socket.on("joinUserSuccess", ({ members, creatorId, userId, roomId }) => {
      store.dispatch(joinUserSuccess({ creatorId, members, userId, roomId }));
    });

    socket.on("changeSomeUserState", ({ players }) => {
      store.dispatch(changeSomeUserState({ players }));
    });

    socket.on("changeMyState", ({ username, role, isReady }) => {
      store.dispatch(changeMyState({ username, role, isReady }));
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
