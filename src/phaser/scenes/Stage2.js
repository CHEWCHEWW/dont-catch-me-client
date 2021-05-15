import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";
import ChaseHeroAI from "../ai/ChaseHeroAI";

import store from "../../store";
import { updateGameProgress } from "../../redux/slices/singlePlaySlice";
import { gameProgress } from "../../constants/gameState";

export default class Stage2 extends Phaser.Scene {
  constructor() {
    super("stage2");
  }

  create() {
    this.map = this.add.tilemap("level2-map");
    
    const tileset = this.map.addTilesetImage("iso-level2", "tiles");
    
    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);
    this.coinLayer = this.map.createLayer("Tile Layer 2", [tileset]);

    this.hero = new Hero(this, 150, 550, "hero");
    this.enemy = new Enemy(this, 200, 200, "hero");
    this.enemy1 = new Enemy(this, 100, 150, "hero");

    this.enemy.setTargetIndicatorColor('#FCB4E3');
    this.enemy1.setTargetIndicatorColor('#FCB72C');

    this.add.existing(this.hero);
    this.add.existing(this.enemy);
    this.add.existing(this.enemy1);
    
    this.physics.world.enable([this.hero, this.enemy, this.enemy1], Phaser.Physics.Arcade.DYNAMIC_BODY);
    
    this.hero.body.setSize(64, 120, true);
    this.enemy.body.setSize(40, 110, true);
    this.enemy1.body.setSize(40, 110, true);

    this.enemy.setAI(new ChaseHeroAI(this.hero, this.enemy, this.boardLayer));
    this.enemy1.setAI(new ChaseHeroAI(this.hero, this.enemy1, this.boardLayer));
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCoinToMap();

		this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(0.8);

    // this.timer = this.time.delayedCall(10000, this.gameOver, [], this);
    this.countDown = this.add.text(32, 32);

    this.physics.add.collider([this.enemy, this.enemy1]);

    this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
      // this.stopGame();
      this.moveNextStage();
    });

    if (this.hero) {
			this.physics.add.overlap(this.hero, this.coins, this.handlePlayerGetCoin, this.checkIsCanPlayerGetCoin, this);
		}
  }

  update(time, delta) {
    // this.countDown.setText("current" + this.timer.getProgress().toString().substr(0, 4));
    this.hero?.handleMovement(delta, this.cursors, this.boardLayer, this.coinLayer);

    if (this.coinCount === 0) {
      this.moveNextStage();
    }
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
			this.physics.add.existing(coin);
			const body = coin.body;

			body.setCircle(38, 26, -6);
		});
  }

  stopGame() {
    this.time.addEvent({
      callback: () => {
        this.scene.pause();
        store.dispatch(updateGameProgress(gameProgress.GAME_OVER));
      },
      delay: 1000,
    });
  }

  moveNextStage() {
    this.time.addEvent({
      callback: () => {
        this.scene.start("stage3");
      },
      delay: 1000,
    });
    // this.cameras.main.fadeOut(1000, 0, 0, 0);
    
    // this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_IN_COMPLETE, (camera, effect) => {
    //   this.scene.start("stage2");
    // });
  }

  handlePlayerGetCoin(object1, object2) {
    object2.destroy(true);

    this.coinCount--;
	}

	checkIsCanPlayerGetCoin(object1, object2) {
		if (!this.hero) {
			return false;
		}
    
		return this.hero.canGetCoin(object2);
	}
}
