import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import config from "../../phaser/scenes/multiplay";
import Modal from "../../components/Modal";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import GameClearModalView from "../../components/Modal/GameClearModalView";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/multiplaySlice";

const MultiplayPage = () => {
  const progress  = useSelector(gameProgressSelector);
  const isWin = useSelector(({ multiple: { user } }) => user.isWin);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  // useEffect(() => {
  //   if (progress === gameProgress.GAME_OVER) {
  //     if (isWin) {

  //       return;
  //     }


  //   }
  // }, [progress]);

  const handleGameOverModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  const handleGameClearModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <>
      {progress === gameProgress.GAME_OVER && (
        <Modal>
          <GameOverModalView onClick={handleGameOverModalClick} message={isWin && "WIN"} />
        </Modal>
      )}
      {progress === gameProgress.GAME_CLEAR && (
        <Modal>
          <GameClearModalView onClick={handleGameClearModalClick} />
        </Modal>
      )}
      <div id="game-container" />
    </>
  );
};

export default MultiplayPage;
