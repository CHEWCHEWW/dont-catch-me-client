import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Modal from "../../components/Modal";
import GameStartModalView from "../../components/Modal/GameStartModalView";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import GameClearModalView from "../../components/Modal/GameClearModalView";
import Preloader from "../../phaser/scenes/Preloader";
import MultiplayerStage from "../../phaser/scenes/MultiplayerStage";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress, gameProgressSelector } from "../../redux/slices/singlePlaySlice";

export const config = {
  type: Phaser.WEBGL,
  scale: {
    width: "100%",
    height: "100%",
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#FFFFFF",
  physics: {
		default: "arcade",
		arcade: {
			gravity: { y: 0 },
			debug: true
		}
	},
	scale: {
		mode: Phaser.Scale.ScaleModes.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH
	},
  scene: [Preloader, MultiplayerStage],
};

const MultiplayPage = () => {
  const { progress } = useSelector(gameProgressSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      const game = new Phaser.Game(config);
    }
  }, [progress]);

  const handleGameStartModalClick = () => {
    dispatch(updateGameProgress(gameProgress.GAME_START));
  };

  const handleGameOverModalClick = () => {
    history.push("/");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  const handleGameClearModalClick = () => {
    history.push("/records");

    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <>
      {progress === gameProgress.GAME_BEFORE_START && (
        <Modal>
          <GameStartModalView onClick={handleGameStartModalClick} />
        </Modal>
      )}
      {progress === gameProgress.GAME_OVER && (
        <Modal>
          <GameOverModalView onClick={handleGameOverModalClick} />
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
