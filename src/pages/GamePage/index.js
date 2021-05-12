import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import Modal from "../../components/Modal";
import StartGameModalView from "../../components/Modal/StartGameModalView";
import Game from "../../phaser/scenes/Game";
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
  scene: [Preloader, Game],
};

const GamePage = () => {
  const { progress } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  console.log(progress)
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isGameStart, setIsGameStart] = useState(false);

  useEffect(() => {
    if (isGameStart) {
      const game = new Phaser.Game(config);
    }
  }, [isGameStart]);

  const handleModalClick = () => {
    setIsGameStart(true);
    setIsModalOpen(false);

    dispatch(updateGameProgress(gameProgress.GAME_START));
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <StartGameModalView onClick={handleModalClick} />
        </Modal>
      )}
      {progress === gameProgress.GAME_OVER && (
        <Modal>
          <StartGameModalView onClick={handleModalClick} />
        </Modal>
      )}
      <div id="game-container" />
    </>
  );
};

export default GamePage;
