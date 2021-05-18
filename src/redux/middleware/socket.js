import { gameProgress } from "../../constants/gameState";
import { 
  updateGameProgress, 
  createRoomSuccess, 
  joinUserSuccess, 
  changeSomeuser, 
  changeMyState,
} from "../slices/multiplaySlice";
import { socket } from "../../utils/socket";

const socketMiddleware = () => {
  return (store) => {
    socket.on("createRoomSuccess", ({ creatorId, roomId }) => {
      store.dispatch(createRoomSuccess({ creatorId, roomId }));
    });

    socket.on("joinUserSuccess", ({ members, creatorId, userId, roomId, username }) => {
      store.dispatch(joinUserSuccess({ creatorId, members, userId, roomId, username }));
    });

    socket.on("changeSomeuser", ({ players }) => {
      store.dispatch(changeSomeuser({ players }));
    });

    socket.on("changeMyState", ({ username, role, isReady }) => {
      store.dispatch(changeMyState({ username, role, isReady }));
    });

    socket.on("startGame", () => {
      store.dispatch(updateGameProgress(gameProgress.GAME_START));
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
