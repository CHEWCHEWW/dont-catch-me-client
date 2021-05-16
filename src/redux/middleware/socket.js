import { gameProgress } from "../../constants/gameState";
import { 
  updateGameProgress, 
  createRoomSuccess, 
  joinUserSuccess, 
  changeSomeUserState, 
  changeMyState,
} from "../slices/multiplaySlice";
import { socket } from "../../utils/socket";

const socketMiddleware = () => {
  return (store) => {
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

        return;
      }

      return next(action);
    };
  };
};

export default socketMiddleware;
