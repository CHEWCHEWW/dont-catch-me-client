import { GAME_PROGRESS } from "../../constants/game";
import {
  updateGameProgress,
  createRoomSuccess,
  joinUserSuccess,
  changeSomeUserState,
  changeMyState,
  leaveSomeUser,
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

    socket.on("changeSomeUserState", ({ players }) => {
      store.dispatch(changeSomeUserState({ players }));
    });

    socket.on("changeMyState", ({ username, role, isReady }) => {
      store.dispatch(changeMyState({ username, role, isReady }));
    });

    socket.on("allUsersReady", () => {
      store.dispatch(updateGameProgress(GAME_PROGRESS.GAME_ALL_PLAYER_READY));
    });

    socket.on("leaveSomeUser", ({ id }) => {
      store.dispatch(leaveSomeUser({ id }));
    });

    socket.on("error", ({ message }) => {
      console.warn(message);
    });

    return (next) => (action) => {
      const [type, actionName] = action.type.split("/");

      if (type === "multiple") {
        socket.emit(actionName, action.payload);
      }

      return next(action);
    };
  };
};

export default socketMiddleware;
