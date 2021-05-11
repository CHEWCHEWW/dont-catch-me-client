import Phaser from "phaser";

export default class Preloader extends Phaser.Scene {
  preload() {
    this.setLoading();

    this.load.image("tiles", "iso-12-tileset.png");
    this.load.tilemapTiledJSON("map", "iso-level1.json");

    this.load.image("hero", "hero.png");

    this.load.atlas("hero-running-left", "hero-running-left.png", "hero-running-left.json");
    this.load.atlas("hero-running-right", "hero-running-right.png", "hero-running-right.json");
    this.load.atlas("hero-running-back-left", "hero-running-back-left.png", "hero-running-back-left.json");
    this.load.atlas("hero-running-back-right", "hero-running-back-right.png", "hero-running-back-right.json");

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
    this.scene.start("game");
  }
}
