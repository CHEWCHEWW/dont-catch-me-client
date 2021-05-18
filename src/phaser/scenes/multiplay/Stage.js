import Hero from "../../gameObjects/Hero";

import { socket } from "../../../utils/socket";
import store from "../../../store";
import { updateGameProgress } from "../../../redux/slices/multiplaySlice";
import { gameProgress } from "../../../constants/gameState";
 
export default class MultiStage extends Phaser.Scene {
  constructor() {
    super("multi");
  }

  init() {
    socket.emit("gameInit");

    this.cameras.main.fadeIn(500, 0, 0, 0);

    this.registry.values.score = {
      rabbit: 0,
      carrot: 0,
    };
  }

  create() {
    this.setBackground();

    socket.on("loadPlayers", ({ player, otherPlayers }) => {
      this.player = new Hero(this, player.x, player.y, player.role === "rabbit" ? "enemy" : "hero");

      this.player.id = player.userId;
      this.player.role = player.role;

      this.otherPlayers = Object.values(otherPlayers).map((playerInfo) => {
        const player = new Hero(
          this,
          playerInfo.x,
          playerInfo.y,
          playerInfo.role === "rabbit" ? "enemy" : "hero"
        );

        player.id = playerInfo.userId;
        player.role = playerInfo.role;

        return player;
      });

      this.physics.world.enable(
        [this.player, ...this.otherPlayers],
        Phaser.Physics.Arcade.DYNAMIC_BODY
      );

      this.createPlayer(this.player);
      
      this.otherPlayers.forEach((player) => {
        this.createPlayer(player);
      });

      this.playerQueuedPosition = {
        x: this.player.x,
        y: this.player.y,
      };

      this.setCamera();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCoinToMap();

    this.setStatusBar();

    socket.on("somePlayerMove", ({ x, y, id, anims }) => {
      const [targetPlayer] = this.otherPlayers.filter(
        (player) => player.id === id
      );

      targetPlayer.x = x;
      targetPlayer.y = y;

      targetPlayer.play(anims, true);
    });

    socket.on("updateCount", ({ score, id }) => {
      const [targetPlayer] = this.otherPlayers.filter(
        (player) => player.id === id
      );

      targetPlayer.getCoin();
      
      this.registry.values.score = { ...score };
    });

    socket.on("getGameResult", ({ isWin }) => {
      this.scene.pause();

      if (isWin) {
        this.player.setWin();
      } else {
        this.player.setLose();
      }

      store.dispatch(updateGameProgress(gameProgress.GAME_OVER));
    });
  }

  update(time, delta) {
    if (!this.player) {
      return;
    }

    this.score.x = this.player.body.position.x + 230;
    this.score.y = this.player.body.position.y - 300;

    this.score.setText(`RABBIT: ${this.registry.values.score.rabbit} vs CARROT: ${this.registry.values.score.carrot}`);

    this.countDown.x = this.player.body.position.x + 50;
    this.countDown.y = this.player.body.position.y - 300;

    const currentTime = this.timer.getProgress().toString().substr(0, 4);

    this.countDown.setText(`TIME: ${currentTime}`);

    this.player.handleMovement(delta, this.cursors, this.boardLayer);

    if (
      this.player.x !== this.playerQueuedPosition.x ||
      this.player.y !== this.playerQueuedPosition.y
    ) {
      socket.emit("movePlayer", {
        x: this.player.x,
        y: this.player.y,
        anims: this.player.anims.currentAnim.key,
      });
    }

    if (this.coinCount === 0) {
      this.stopGame();
    }
  }

  setBackground() {
    this.map = this.add.tilemap("level1-map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);
    this.coinLayer = this.map.createLayer("Tile Layer 2", [tileset]);

    this.add.image(1300, 400, "cloud").setDepth(1);
    this.add.image(0, 0, "cloud").setDepth(1);
    this.add.image(-800, 200, "cloud").setDepth(1);
    this.add.image(600, 150, "cloud").setDepth(1);
    this.add.image(-1300, 600, "cloud").setDepth(1);
  }

  setCamera() {
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player, true);
  }

  setStatusBar() {
    this.score = this.add
      .bitmapText(0, 0, "font", `Rabbit: ${this.registry.values.score.rabbit} Carrot: ${this.registry.values.score.carrot}`)
      .setDepth(7);

    this.countDown = this.add
      .bitmapText(0, 0, "font", `TIME:  ${this.registry.values.time}`)
      .setDepth(7);

    this.timer = this.time.delayedCall(90000, this.gameOver, [], this);
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

  createPlayer(player) {
    this.add.existing(player);

    player.body.setSize(64, 120, true);

    this.physics.add.overlap(
      player,
      this.coins,
      this.handlePlayerGetCoin,
      this.checkIsCanPlayerGetCoin(player),
      this,
    );
  }

  stopGame() {
    this.time.addEvent({
      callback: () => {
        socket.emit("gameOver", {
          score: this.registry.values.score,
          role: this.player.role,
        });
      },
      delay: 1000,
    });    
  }

  handlePlayerGetCoin(player, coin) {
    coin.destroy(true);
    
    this.coinCount--;

    player.getCoin();

    if (player.id === this.player.id) {
      socket.emit("userGetCoin", { role: player.role, point: 10 });
    }
  }

  checkIsCanPlayerGetCoin(player) {
    return (object, coin) => {
      if (!player) {
        return false;
      }

      return player.canGetCoin(coin);
    };
  }
}
