import Phaser from "phaser";

import Hero from "./Hero";

export default class Game extends Phaser.Scene {
  constructor() {
    super("main");
  }

  preload() {
    this.load.image("tiles", "iso-12-tileset.png");
    this.load.tilemapTiledJSON("map", "iso-12-tileset.json");

    this.load.image("hero", "hero.png");

    this.load.atlas("hero-running-left", "hero-running-left.png", "hero-running-left.json");
    this.load.atlas("hero-running-right", "hero-running-right.png", "hero-running-right.json");
  }

  create() {
    const map = this.add.tilemap("map");
    const tileset = map.addTilesetImage("iso-12-tileset", "tiles");

    this.boardLayer = map.createLayer("Tile Layer 1", tileset)
      .setCollisionByProperty({ collides: true });

    this.hero = new Hero(this, 380, 300, "hero");

    this.physics.world.enableBody(this.hero, Phaser.Physics.Arcade.DYNAMIC_BODY)
    
    this.add.existing(this.hero);

    this.cameras.main.startFollow(this.hero);
    this.cameras.main.setZoom(1);

    this.anims.create({
      key: "hero-running-right",
      framRate: 100,
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
      framRate: 100,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-running-left", {
        start: 1,
        end: 5,
        prefix: "hero-running-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });
  }

  update(time, delta) {
    this.cursors = this.input.keyboard.createCursorKeys();

    if (this.hero) {
      this.hero.handleMovement(delta, this.cursors, this.boardLayer);
    }
  }
}

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
  scene: [Game],
};
