import React from "react";
import Phaser from "phaser";

import { config } from "../phaser/gameObjects/Game";

const StartPage = () => {
  useEffect(() => {
    const game = new Phaser.Game(config);
  }, []);

  return (
    <>
      <div id="game-container" />
    </>
  );
};

export default StartPage;
