import Hero from "../../../gameObjects/Hero";
import Enemy from "../../../gameObjects/Enemy";
import ChaseHeroAI from "../../../ai/ChaseHeroAI";

import store from "../../../../store";
import { updateGameProgress } from "../../../../redux/slices/singlePlaySlice";
import { gameProgress } from "../../../../constants/gameState";

export default class Stage extends Phaser.Scene {
  // constructor() {
  //   super("stage1");
  // }

  init() {
    this.cameras.main.fadeIn(500, 0, 0, 0);
    
    this.isCleared = false;
  }

  create() {
    // this.game.events.emit("gameStart"); // 특이점

    // this.setBackground(1); // 특이점

    // this.setCharacters(Level1); // 특이점

    this.setStatusBar();

    this.setCoinToMap();
    
    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCamera();
  }

  update(time, delta) {
    if (!this.hero) {
      return;
    }

    this.score.x = this.hero.body.position.x + 350;
    this.score.y = this.hero.body.position.y - 300;

    this.score.setText(`SCORE: ${this.registry.values.score}`);

    this.countDown.x = this.hero.body.position.x + 180;
    this.countDown.y = this.hero.body.position.y - 300;

    const currentTime = this.timer.getProgress().toString().substr(0, 4);

    this.countDown.setText(`TIME: ${currentTime}`);

    this.hero.handleMovement(
      this.cursors,
      this.boardLayer,
    );

    // if (this.coinCount === 0 && !this.isCleared) { // 특이점
    //   this.moveNextStage();

    //   this.isCleared = true;
    // }
  }

  setBackground(level) {
    this.map = this.add.tilemap(`level${level}-map`);

    const tileset = this.map.addTilesetImage(`iso-level${level}`, "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", tileset).setDepth(2);
    this.coinLayer = this.map.createLayer("Tile Layer 2", tileset);

    this.add.image(1300, 400, "cloud").setDepth(1);
    this.add.image(0, 0, "cloud").setDepth(1);
    this.add.image(-800, 200, "cloud").setDepth(1);
    this.add.image(600, 150, "cloud").setDepth(1);
    this.add.image(-1300, 600, "cloud").setDepth(1);
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
      this.physics.add.existing(coin);

      const body = coin.body;

      body.setCircle(38, 26, -6);
      coin.setDepth(4);
    });
    
    if (this.hero) {
      this.physics.add.overlap(
        this.hero,
        this.coins,
        this.handlePlayerGetCoin,
        this.checkIsCanPlayerGetCoin,
        this
      );
    }
  }

  setStatusBar() {
    this.score = this.add
      .bitmapText(0, 0, "font", `SCORE: ${this.registry.values.score}`)
      .setDepth(7);
    this.countDown = this.add
      .bitmapText(0, 0, "font", `TIME:  ${this.registry.values.time}`)
      .setDepth(7);

    this.timer = this.time.delayedCall(90000, this.stopStage, [], this);
  }

  setCharacters(enemyList) {
    this.createHero();
    
    this.createEnemies(enemyList);
    
    this.physics.add.collider(this.hero, this.enemies, () => {
      this.stopStage();
    });
  }

  createHero() {
    this.hero = new Hero(this, 100, 550, "hero");

    this.add.existing(this.hero).setDepth(5);

    this.physics.world.enable(
      this.hero,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    this.hero.body.setSize(40, 110, true);
  }

  createEnemies(enemyList) {
    this.enemies = enemyList.map((enemy) => {
      const newEnemy = new Enemy(this, enemy.x, enemy.y, "enemy");

      newEnemy.setTargetIndicatorColor(enemy.indicatorColor);

      this.add.existing(newEnemy).setDepth(5);

      this.physics.world.enable(
        newEnemy,
        Phaser.Physics.Arcade.DYNAMIC_BODY
      );
      
      newEnemy.body.setSize(40, 110, true);

      const ai = enemy.ai;
      
      switch (ai) {
        case "chase": {
          newEnemy.setAI(new ChaseHeroAI(this.hero, newEnemy, this.boardLayer));
          break;
        }
        default:
          break;
      }

      return newEnemy;
    });

    this.physics.add.collider(this.enemies);
  }

  setCamera() {
    this.cameras.main.startFollow(this.hero, true);
    this.cameras.main.setZoom(1);
  }

  stopStage() {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.time.addEvent({
      callback: () => {
        store.dispatch(updateGameProgress(gameProgress.GAME_OVER));
      },
      delay: 2000,
    });
  }

  moveNextStage(callback) {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.hero.setWin();

    this.time.addEvent({
      callback: () => { //특이점
        this.cameras.main.fadeOut(3000, 50, 50, 50);

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
         callback
        );
      },
      delay: 2000,
    });
  }

  handlePlayerGetCoin(hero, coin) {
    coin.destroy(true);

    hero.getCoin();

    this.coinCount--;

    this.registry.values.score += 10;
  }

  checkIsCanPlayerGetCoin(hero, coin) {
    if (!hero) {
      return false;
    }

    return hero.canGetCoin(coin);
  }

  handleEnemyUnSubscribeAI() {
    this.enemies.forEach((enemy) => {
      enemy.unSubscribeAI();
    });
  }
}
