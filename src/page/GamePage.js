import React, { useEffect } from "react";

import { config } from "../phaser/gameObjects/Game";

const GamePage = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  return (
    <>
      <div id="game-container" />
    </>
  );
};

export default GamePage;
