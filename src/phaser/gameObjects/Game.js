import Phaser from "phaser";

import Hero from "./Hero";
import Enemy from "./Enemy";
import ChaseHeroAI from "../ai/ChaseHeroAI";

export default class Game extends Phaser.Scene {
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
    this.map = this.add.tilemap("map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);

    this.hero = new Hero(this, 300, 300, "hero");
    this.enemy = new Enemy(this, 200, 200, "hero");
    this.enemy1 = new Enemy(this, 100, 150, "hero");
    
    this.physics.world.enable([this.hero, this.enemy, this.enemy1], Phaser.Physics.Arcade.DYNAMIC_BODY);
    this.hero.body.setSize(64, 120, true);
    this.enemy.body.setSize(64, 120, true);
    this.enemy1.body.setSize(64, 120, true);

    this.enemy.setAI(new ChaseHeroAI(this.hero, this.enemy, this.boardLayer));
    this.enemy1.setAI(new ChaseHeroAI(this.hero, this.enemy1, this.boardLayer));

    this.add.existing(this.hero);
    this.add.existing(this.enemy);
    this.add.existing(this.enemy1);

    this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
      // callback
    });

    this.physics.add.collider([this.enemy, this.enemy1]);

		this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(0.8);

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
