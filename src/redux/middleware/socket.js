import { io } from "socket.io-client";

const socketMiddleware = (url) => {
  return (store) => {
    const socket = io.connect(url);

    socket.on("message", (message) => {
      console.log(30);
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
