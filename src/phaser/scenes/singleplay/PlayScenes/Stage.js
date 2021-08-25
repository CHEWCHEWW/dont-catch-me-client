import Hero from "../../../gameObjects/Hero";
import Enemy from "../../../gameObjects/Enemy";
import ChaseHeroAI from "../../../ai/ChaseHeroAI";
import RotateAI from "../../../ai/RotateAI";
import ConditionalChaseAI from "../../../ai/ConditionalChaseAI";
import CountDownScene from "../../common/CountDownScene";

import { GAME_PROGRESS } from "../../../../constants/game";
import { CLOUDS } from "../../../../constants/coordinates";
import {
  GAME_FONT_OPTION,
  GAME_STATUS,
  GAME_ITEM,
  GAME_SCENE,
  COUNT_DOWN_LOCATION,
  SCORE_LOCATION,
  COIN,
  CLOUD,
  HERO,
  ENEMY,
  AI,
  CAMERA_OPTION,
  TIME,
  SCORE
} from "../../../../constants/game";
import { calculateTime } from "../../../../utils/times";

export default class Stage extends Phaser.Scene {
  init() {
    this.isCleared = false;
    this.isStarted = false;
  }

  create() {
    this.successEffect = this.sound.add(GAME_STATUS.SUCCESS, { loop: false });
    this.coinEffect = this.sound.add(GAME_ITEM.COIN, { loop: false });
    this.failEffect = this.sound.add(GAME_STATUS.FAIL, { loop: false });
    this.mainMusic = this.sound.add(GAME_STATUS.MAIN, { loop: true });

    const countDownScene = new CountDownScene(this.scene, this.mainMusic);

    this.scene.add(GAME_SCENE.COUNT_DOWN_SCENE, countDownScene, true);

    this.setStatusBar();

    this.setCoinToMap();

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCamera();
  }

  update() {
    if (!this.hero || !this.hero.body) {
      return;
    }

    const currentTime = calculateTime(this.timer.getElapsedSeconds());

    this.countDown.setText(`TIME: ${currentTime}`).setDepth(COUNT_DOWN_LOCATION.DEPTH);

    this.countDown.x = this.hero.body.position.x + COUNT_DOWN_LOCATION.X;
    this.countDown.y = this.hero.body.position.y - COUNT_DOWN_LOCATION.Y;

    this.score.setText(`SCORE: ${this.registry.values.score}`).setDepth(COUNT_DOWN_LOCATION.DEPTH);

    this.score.x = this.hero.body.position.x + SCORE_LOCATION.X;
    this.score.y = this.hero.body.position.y - SCORE_LOCATION.Y;

    this.hero.handleMovement(
      this.cursors,
      this.boardLayer,
    );
  }

  setBackground(level) {
    this.map = this.add.tilemap(`level${level}-map`);

    const tileset = this.map.addTilesetImage(`iso-level${level}`, GAME_ITEM.TILES);

    this.boardLayer = this.map.createLayer(GAME_ITEM.TILE_LAYER_1, tileset).setDepth(2);
    this.coinLayer = this.map.createLayer(GAME_ITEM.TILE_LAYER_2, tileset);

    CLOUDS.forEach((cloud) => {
      this.add.image(cloud.x, cloud.y, GAME_ITEM.CLOUD).setDepth(CLOUD.DEPTH);
    });
  }

  setCoinToMap() {
    this.coins = this.coinLayer.createFromTiles(COIN.INDEX, COIN.NO_CONFIG, { key: GAME_ITEM.COIN });

    this.coinCount = this.coins.length;

    this.coins.forEach((coin) => {
      this.physics.add.existing(coin);

      const body = coin.body;

      body.setCircle(COIN.WIDTH, COIN.HEIGHT, COIN.NO_CONFIG);
      coin.setDepth(COIN.DEPTH);
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
      .text(0, 500, "SCORE: ", {
        fontSize: GAME_FONT_OPTION.SIZE,
        fill: GAME_FONT_OPTION.COLOR,
        fontFamily: GAME_FONT_OPTION.FONTFAMILY,
      })
      .setDepth(GAME_FONT_OPTION.DEPTH);

    this.countDown = this.add
      .text(0, 500, "TIME: ", {
        fontSize: GAME_FONT_OPTION.SIZE,
        fill: GAME_FONT_OPTION.COLOR,
        fontFamily: GAME_FONT_OPTION.FONTFAMILY,
      })
      .setDepth(GAME_FONT_OPTION.DEPTH);

    this.timer = this.time.delayedCall(TIME.TIME_LIMIT, this.stopStage, [], this);
  }

  setCharacters(enemyList) {
    this.createHero();

    this.createEnemies(enemyList);

    this.physics.add.collider(this.hero, this.enemies, () => {
      this.stopStage();
    });
  }

  createHero() {
    this.hero = new Hero(this, HERO.X, HERO.Y, GAME_ITEM.HERO);

    this.add.existing(this.hero).setDepth(HERO.DEPTH);

    this.physics.world.enable(
      this.hero,
      Phaser.Physics.Arcade.DYNAMIC_BODY
    );

    this.hero.body.setSize(HERO.WIDTH, HERO.HEIGHT, true);
    this.hero.body.setOffset(HERO.OFFSET_X, HERO.OFFSET_Y);
  }

  createEnemies(enemyList) {
    this.enemies = enemyList.map((enemy) => {
      const newEnemy = new Enemy(this, enemy.x, enemy.y, GAME_ITEM.ENEMY);

      this.add.existing(newEnemy).setDepth(ENEMY.DEPTH);

      this.physics.world.enable(
        newEnemy,
        Phaser.Physics.Arcade.DYNAMIC_BODY
      );

      newEnemy.body.setSize(ENEMY.WIDTH, ENEMY.HEIGHT, true);
      newEnemy.body.setOffset(ENEMY.OFFSET_X, ENEMY.OFFSET_Y);

      const ai = enemy.ai;

      switch (ai) {
        case AI.CHASE: {
          newEnemy.setAI(new ChaseHeroAI(this.hero, newEnemy, this.boardLayer));
          break;
        }
        case AI.CONDITIONAL_CHASE: {
          newEnemy.setTint(0xFFD3DD);
          newEnemy.setAI(new ConditionalChaseAI(
            this.hero,
            newEnemy,
            this.boardLayer,
            new RotateAI({ x: enemy.x, y: enemy.y }, newEnemy, this.boardLayer, this.hero),
            new ChaseHeroAI(this.hero, newEnemy, this.boardLayer),
          ));
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
    this.cameras.main.setZoom(CAMERA_OPTION.ZOOM);
  }

  stopStage() {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.failEffect.play();
    this.mainMusic.pause();

    this.hero.setDie();

    this.time.addEvent({
      callback: () => {
        this.game.events.emit(GAME_PROGRESS.GAME_OVER);

        this.hero.destroy();
        this.enemies.forEach((enemy) => {
          enemy.destroy();
        });
      },
      callbackScope: this,
      delay: TIME.STAGE_DELAY,
    });
  }

  moveNextStage(callback) {
    this.cursors = null;

    this.handleEnemyUnSubscribeAI();

    this.hero.setWin();

    this.mainMusic.pause();
    this.successEffect.play();

    this.time.addEvent({
      callback: () => {
        this.cameras.main.fadeOut(CAMERA_OPTION.DURATION, CAMERA_OPTION.RED, CAMERA_OPTION.GREEN, CAMERA_OPTION.BLUE);

        this.cameras.main.once(
          Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE,
          callback
        );
      },
      callbackScope: this,
      delay: TIME.STAGE_DELAY,
    });
  }

  handlePlayerGetCoin(hero, coin) {
    coin.destroy(true);

    hero.getCoin();

    this.coinEffect.play();

    this.coinCount--;

    this.registry.values.score += SCORE;
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
      enemy.setIdle();
    });
  }
}
