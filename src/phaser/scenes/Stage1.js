import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";
import ChaseHeroAI from "../ai/ChaseHeroAI";

import store from "../../store";
import { updateGameProgress } from "../../redux/slices/singlePlaySlice";
import { gameProgress } from "../../constants/gameState";

export default class Stage1 extends Phaser.Scene {
  constructor() {
    super("stage1");
  }

  init() {
    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.registry.values.score = 0;
    this.registry.values.time = 0;
  }

  create() {
    this.setTileMap();

    this.hero = new Hero(this, 150, 550, "hero");
    this.enemy = new Enemy(this, 200, 200, "enemy");
    this.enemy1 = new Enemy(this, 100, 150, "enemy");

    this.enemy.setTargetIndicatorColor('#FCB4E3'); // 앞으로 삭제 될 예정..
    this.enemy1.setTargetIndicatorColor('#FCB72C');

    this.add.existing(this.hero);
    this.add.existing(this.enemy);
    this.add.existing(this.enemy1);
    
    this.physics.world.enable([this.hero, this.enemy, this.enemy1], Phaser.Physics.Arcade.DYNAMIC_BODY);
    
    this.hero.body.setSize(40, 110, true);
    this.enemy.body.setSize(40, 110, true);
    this.enemy1.body.setSize(40, 110, true);

    this.enemy.setAI(new ChaseHeroAI(this.hero, this.enemy, this.boardLayer));
    this.enemy1.setAI(new ChaseHeroAI(this.hero, this.enemy1, this.boardLayer));

    this.physics.add.collider([this.enemy, this.enemy1]);

    this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
      this.stopGame();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCoinToMap();

		this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(0.8);

    this.timer = this.time.delayedCall(30000, this.gameOver, [], this);
    this.countDown = this.add.text(32, 32);

    if (this.hero) {
			this.physics.add.overlap(this.hero, this.coins, this.handlePlayerGetCoin, this.checkIsCanPlayerGetCoin, this);
		}
  }

  update(time, delta) {
    this.countDown.setText("current" + this.timer.getProgress().toString().substr(0, 4));
    
    this.hero?.handleMovement(delta, this.cursors, this.boardLayer, this.coinLayer);

    if (this.coinCount === 0) {
      this.moveNextStage();
    }
  }

  setTileMap() {
    this.map = this.add.tilemap("level1-map");
    const tileset = this.map.addTilesetImage("iso-level1", "tiles");
    
    this.boardLayer = this.map.createLayer("Tile Layer 1", tileset);
    this.coinLayer = this.map.createLayer("Tile Layer 2", tileset).setCollisionByProperty({ collides: true });

    this.coinLayer.setCollision(6);
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
			this.physics.add.existing(coin);
			const body = coin.body;

			body.setCircle(38, 26, -6);

      this.physics.add.staticGroup(coin, this.hero);
		});
  }

  stopGame() {
    this.cursors = null;

    this.enemy.unSubscribeAI();
    this.enemy1.unSubscribeAI();
    this.hero.setDie();
    // 이 사이에 다음 페이지로 넘어간다는 로고 띄우기..!
    this.time.addEvent({
      callback: () => {
        store.dispatch(updateGameProgress(gameProgress.GAME_OVER)); // event로 바꿔주기
      },
      delay: 2000,
    });
  }

  moveNextStage() {
    this.enemy.unSubscribeAI();
    this.enemy1.unSubscribeAI();
    // 이 사이에 다음 페이지로 넘어간다는 로고 띄우기..!
    this.time.addEvent({
      callback: () => {
        this.cameras.main.fadeOut(3000, 50, 50, 50);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start("stage2");
        });
      },
      delay: 2000,
    });
  }

  handlePlayerGetCoin(hero, coin) {
    coin.destroy(true);

    this.hero.getCoin();

    this.coinCount--;
	}

	checkIsCanPlayerGetCoin(hero, coin) {
    if (!this.hero) {
      return false;
    }

    return this.hero.canGetCoin(coin);
  }
}
