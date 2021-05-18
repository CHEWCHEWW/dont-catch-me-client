import Phaser from "phaser";

import createHeroAnimations from "../../animations/Hero";
import createEnemyAnimations from "../../animations/Enemy";

export default class Preloader extends Phaser.Scene {
  preload() {
    this.setLoading();

    this.loadBackgroundResource();
    this.loadHeroResource();
    this.loadEnemyResource();

    this.load.on("progress", this.updateLoading, { newGraphics: this.newGraphics, loadingText: this.loadingText });
    this.load.on("complete", this.completeLoading, { scene: this.scene });
  }

  create() {
    createHeroAnimations(this.anims);
    createEnemyAnimations(this.anims);
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

  loadHeroResource() {
    this.load.image("hero", "hero.png");

    this.load.atlas("hero-running-left", "hero-running-left.png", "hero-running-left.json");
    this.load.atlas("hero-running-right", "hero-running-right.png", "hero-running-right.json");
    this.load.atlas("hero-running-back-left", "hero-running-back-left.png", "hero-running-back-left.json");
    this.load.atlas("hero-running-back-right", "hero-running-back-right.png", "hero-running-back-right.json");

    this.load.atlas("hero-idle-left", "hero-idle-left.png", "hero-idle-left.json");
    this.load.atlas("hero-idle-right", "hero-idle-right.png", "hero-idle-right.json");
    this.load.atlas("hero-idle-back-left", "hero-idle-back-left.png", "hero-idle-back-left.json");
    this.load.atlas("hero-idle-back-right", "hero-idle-back-right.png", "hero-idle-back-right.json");

    this.load.atlas("hero-die-left", "hero-die-left.png", "hero-die-left.json");
    this.load.atlas("hero-die-right", "hero-die-right.png", "hero-die-right.json");
    this.load.atlas("hero-die-back-left", "hero-die-back-left.png", "hero-die-back-left.json");
    this.load.atlas("hero-die-back-right", "hero-die-back-right.png", "hero-die-back-right.json");
  }

  loadEnemyResource() {
    this.load.image("enemy", "enemy.png");
   
    this.load.atlas("enemy-idle-left", "enemy-idle-left.png", "enemy-idle-left.json");
    this.load.atlas("enemy-idle-right", "enemy-idle-right.png", "enemy-idle-right.json");
    this.load.atlas("enemy-idle-back-left", "enemy-idle-back-left.png", "enemy-idle-back-left.json");
    this.load.atlas("enemy-idle-back-right", "enemy-idle-back-right.png", "enemy-idle-back-right.json");

    this.load.atlas("enemy-running-left", "enemy-running-left.png", "enemy-running-left.json");
    this.load.atlas("enemy-running-right", "enemy-running-right.png", "enemy-running-right.json");
    this.load.atlas("enemy-running-back-left", "enemy-running-back-left.png", "enemy-running-back-left.json");
    this.load.atlas("enemy-running-back-right", "enemy-running-back-right.png", "enemy-running-back-right.json");
  }

  loadBackgroundResource() {
    this.load.image("cloud", "clouds.png");

    this.load.image("tiles", "iso-12-tileset.png");
    this.load.image("coin", "coin.png");
    this.load.image("add-coin", "add-coin.png");

    this.load.image("start", "start.png");
    this.load.image("win", "win.png");
    this.load.image("lose", "lose.png");

    this.load.bitmapFont("font", "font.png", "font.fnt");
    
    this.load.tilemapTiledJSON("level1-map", "iso-level1.json");
    this.load.tilemapTiledJSON("level2-map", "iso-level2.json");
    this.load.tilemapTiledJSON("level3-map", "iso-level3.json");
  }
}
