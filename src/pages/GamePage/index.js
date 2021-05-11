import React, { useEffect } from "react";

import { config } from "../../phaser/gameObjects/Game";

const GamePage = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  return (
    <>
      <div>title</div>
      <div id="game-container" />
    </>
  );
};

export default GamePage;
