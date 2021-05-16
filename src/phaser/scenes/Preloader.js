import Phaser from "phaser";

const WebFontConfig = {
  google: {
    families: ['Rajdhani']
  }
};

export default class Preloader extends Phaser.Scene {
  preload() {
    this.setLoading();

    this.load.image("tiles", "iso-12-tileset.png");
    this.load.image("coin", "coin.png");
    this.load.tilemapTiledJSON("level1-map", "iso-level1.json");
    this.load.tilemapTiledJSON("level2-map", "iso-level2.json");
    this.load.tilemapTiledJSON("level3-map", "iso-level3.json");

    this.load.image("hero", "hero.png");
    this.load.image("enemy", "enemy.png");

    this.load.atlas("hero-running-left", "hero-running-left.png", "hero-running-left.json");
    this.load.atlas("hero-running-right", "hero-running-right.png", "hero-running-right.json");
    this.load.atlas("hero-running-back-left", "hero-running-back-left.png", "hero-running-back-left.json");
    this.load.atlas("hero-running-back-right", "hero-running-back-right.png", "hero-running-back-right.json");

    this.load.atlas("hero-idle-left", "hero-idle-left.png", "hero-idle-left.json");
    this.load.atlas("hero-idle-right", "hero-idle-right.png", "hero-idle-right.json");
    this.load.atlas("hero-idle-back-left", "hero-idle-back-left.png", "hero-idle-back-left.json");
    this.load.atlas("hero-idle-back-right", "hero-idle-back-right.png", "hero-idle-back-right.json");

    this.load.atlas("enemy-idle-left", "enemy-idle-left.png", "enemy-idle-left.json");
    this.load.atlas("enemy-idle-right", "enemy-idle-right.png", "enemy-idle-right.json");
    this.load.atlas("enemy-idle-back-left", "enemy-idle-back-left.png", "enemy-idle-back-left.json");
    this.load.atlas("enemy-idle-back-right", "enemy-idle-back-right.png", "enemy-idle-back-right.json");

    this.load.atlas("enemy-running-left", "enemy-running-left.png", "enemy-running-left.json");
    this.load.atlas("enemy-running-right", "enemy-running-right.png", "enemy-running-right.json");
    this.load.atlas("enemy-running-back-left", "enemy-running-back-left.png", "enemy-running-back-left.json");
    this.load.atlas("enemy-running-back-right", "enemy-running-back-right.png", "enemy-running-back-right.json");

    this.load.on("progress", this.updateLoading, { newGraphics: this.newGraphics, loadingText: this.loadingText });
    this.load.on("complete", this.completeLoading, { scene: this.scene });
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

    this.anims.create({
      key: "enemy-running-right",
      frameRate: -5,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-running-right", {
        start: 1,
        end: 8,
        prefix: "enemy-running-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-running-left",
      frameRate: 15,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-running-left", {
        start: 1,
        end: 8,
        prefix: "enemy-running-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-running-back-left",
      frameRate: 10,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-running-back-left", {
        start: 1,
        end: 8,
        prefix: "enemy-running-back-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-running-back-right",
      frameRate: 50,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-running-back-right", {
        start: 1,
        end: 8,
        prefix: "enemy-running-back-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-idle-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-idle-right", {
        start: 1,
        end: 6,
        prefix: "hero-idle-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-idle-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-idle-left", {
        start: 1,
        end: 6,
        prefix: "hero-idle-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-idle-back-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-idle-back-left", {
        start: 1,
        end: 6,
        prefix: "hero-idle-back-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "hero-idle-back-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("hero-idle-back-right", {
        start: 1,
        end: 6,
        prefix: "hero-idle-back-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-idle-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-idle-right", {
        start: 1,
        end: 6,
        prefix: "enemy-idle-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-idle-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-idle-left", {
        start: 1,
        end: 6,
        prefix: "enemy-idle-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-idle-back-left",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-idle-back-left", {
        start: 1,
        end: 6,
        prefix: "enemy-idle-back-left",
        zeroPad: 2,
        suffix: ".png",
      }),
    });

    this.anims.create({
      key: "enemy-idle-back-right",
      frameRate: 300,
      repeat: -1,
      frames: this.anims.generateFrameNames("enemy-idle-back-right", {
        start: 1,
        end: 6,
        prefix: "enemy-idle-back-right",
        zeroPad: 2,
        suffix: ".png",
      }),
    });
  }

  setLoading() {
    this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();

		const loadingBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
		const loadingBarContent = new Phaser.Geom.Rectangle(205, 205, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(loadingBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(loadingBarContent);

		this.loadingText = this.add.text(250, 260, "Loading: ", { fontSize: "32px", fill: "#000000" });
  }

  updateLoading(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x3587e2, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage * 390, 40));
        
    percentage = percentage * 100;

    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");
  }

  completeLoading() {
    this.scene.start("stage1");
  }
}
