import React, { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import StartGameModalView from "../../components/Modal/StartGameModalView";
import Main from "../../phaser/scenes/Game";
import Preloader from "../../phaser/scenes/Preloader";


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
  scene: [Preloader, Main],
};

const GamePage = () => {
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
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <StartGameModalView onClick={handleModalClick} />
        </Modal>
      )}
      <div>title</div>
      <div id="game-container" />
    </>
  );
};

export default GamePage;
