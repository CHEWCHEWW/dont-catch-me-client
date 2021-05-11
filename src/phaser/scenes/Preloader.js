import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  preload() {
    this.load.image("tiles", "iso-12-tileset.png");
    this.load.tilemapTiledJSON("map", "iso-level1.json");

    this.load.image("hero", "hero.png");

    this.load.atlas("hero-running-left", "hero-running-left.png", "hero-running-left.json");
    this.load.atlas("hero-running-right", "hero-running-right.png", "hero-running-right.json");
    this.load.atlas("hero-running-back-left", "hero-running-back-left.png", "hero-running-back-left.json");
    this.load.atlas("hero-running-back-right", "hero-running-back-right.png", "hero-running-back-right.json");
  }

  create() {
    this.anims.create({
      key: "hero-running-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-running-right", {
        start: 1,
        end: 5,
        prefix: "hero-running-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-running-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-running-left", {
        start: 1,
        end: 5,
        prefix: "hero-running-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-running-back-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-running-back-left", {
        start: 1,
        end: 5,
        prefix: "hero-running-back-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-running-back-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-running-back-right", {
        start: 1,
        end: 5,
        prefix: "hero-running-back-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });
  }

  update() {
    this.scene.start("game");
  }
}
