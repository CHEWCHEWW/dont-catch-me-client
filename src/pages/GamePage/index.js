import React, { useEffect, useState } from "react";

import Modal from "../../components/Modal";
import StartGameModalView from "../../components/Modal/StartGameModalView";
import { config } from "../../phaser/gameObjects/Game";

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
