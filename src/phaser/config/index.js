import Phaser from "phaser";

import Preloader from "../scenes/Preloader";
import Stage1 from "../scenes/Stage1";
import Stage2 from "../scenes/Stage2";
import Stage3 from "../scenes/Stage3";
import MultiStage from "../scenes/MultiStage";

export const singleConfig = {
  type: Phaser.WEBGL,
  scale: {
    width: "100%",
    height: "100%",
    mode: Phaser.Scale.FIT,
    parent: "game-container",
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#60E7F7",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
  scale: {
    // mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, Stage1, Stage2, Stage3],
};

export const multiConfig = {
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
      debug: true,
    },
  },
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [Preloader, MultiStage],
};
