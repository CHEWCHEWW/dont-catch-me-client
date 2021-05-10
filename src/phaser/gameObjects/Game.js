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
    this.load.atlas("hero-running", "hero-running.png", "hero-running.json");
  }

  create() {
    const map = this.add.tilemap("map");
    const tileset = map.addTilesetImage("iso-12-tileset", "tiles");

    this.boardLayer = map.createLayer("Tile Layer 1", tileset)
      .setCollisionByProperty({ collides: true });

    this.hero = new Hero(this, 456, 384, "hero");

    this.physics.world.enableBody(this.hero, Phaser.Physics.Arcade.DYNAMIC_BODY)
    
    this.add.existing(this.hero);
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
