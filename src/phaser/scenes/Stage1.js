import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";
import ChaseHeroAI from "../ai/ChaseHeroAI";

import store from "../../store";
import { updateGameProgress } from "../../redux/slices/gameSlice";
import { gameProgress } from "../../constants/gameState";

export default class Stage1 extends Phaser.Scene {
  constructor() {
    super("stage1");
  }

  create() {
    this.map = this.add.tilemap("map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);
    this.coinLayer = this.map.createLayer("Tile Layer 2", [tileset]);

    this.hero = new Hero(this, 300, 300, "hero");
    this.enemy = new Enemy(this, 200, 200, "hero");
    this.enemy1 = new Enemy(this, 100, 150, "hero");

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

		this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(0.8);

    // this.timer = this.time.delayedCall(10000, this.levelUp, [], this);
    this.countDown = this.add.text(32, 32);

    const coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    coins.forEach((coin) => {
			this.physics.add.existing(coin);
      console.log(coin);
			const body = coin.body;

			body.setCircle(4, 12, 12);
		});
    
    this.physics.add.collider([this.enemy, this.enemy1]);

    this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
      this.gameOver();
    });
  }

  update(time, delta) {
    if (this.hero) {
      this.hero.handleMovement(delta, this.cursors, this.boardLayer, this.coinLayer);
    }

    // this.countDown.setText("current" + this.timer.getProgress().toString().substr(0, 4));
  }

  gameOver() {
    // this.time.addEvent({
    //   callback: () => {
    //     this.scene.pause();
    //     store.dispatch(updateGameProgress(gameProgress.GAME_OVER));
    //   },
    //   delay: 1000,
    // });
  }

  levelUp() {
    this.scene.start("stage2");
  }
}
