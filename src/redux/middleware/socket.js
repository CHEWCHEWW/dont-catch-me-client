import { io } from "socket.io-client";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("somePlayerJoin", (message) => {
      console.log(socket.id);
      store.dispatch();
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
