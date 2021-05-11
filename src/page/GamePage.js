import React, { useEffect } from "react";

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
