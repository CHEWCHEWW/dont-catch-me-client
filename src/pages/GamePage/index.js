import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

import Modal from "../../components/Modal";
import GameStartModalView from "../../components/Modal/GameStartModalView";
import GameOverModalView from "../../components/Modal/GameOverModalView";
import Stage1 from "../../phaser/scenes/Stage1";
import Preloader from "../../phaser/scenes/Preloader";
import { gameProgress } from "../../constants/gameState";
import { updateGameProgress } from "../../redux/slices/gameSlice";

export const config = {
  type: Phaser.WEBGL,
  width: 800,
  height: 600,
  backgroundColor: "#FFFFFF",
  parent: "game-container",
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
  scene: [Preloader, Stage1],
};

const GamePage = () => {
  const { progress } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const history = useHistory();
  
  const [isStartModalOpen, setIsStartModalOpen] = useState(true);

  useEffect(() => {
    if (progress === gameProgress.GAME_START) {
      const game = new Phaser.Game(config);
    }
  }, [progress]);

  const handleGameStartModalClick = () => {
    setIsStartModalOpen(false);

    dispatch(updateGameProgress(gameProgress.GAME_START));
  };

  const handleGameOverModalClick = () => {
    history.push("/");
    dispatch(updateGameProgress(gameProgress.GAME_BEFORE_START));
  };

  return (
    <>
      {isStartModalOpen && (
        <Modal>
          <GameStartModalView onClick={handleGameStartModalClick} />
        </Modal>
      )}
      {progress === gameProgress.GAME_OVER && (
        <Modal>
          <GameOverModalView onClick={handleGameOverModalClick} />
        </Modal>
      )}
      <div id="game-container" />
    </>
  );
};

export default GamePage;
