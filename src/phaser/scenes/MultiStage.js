import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";

import { socket } from "../../utils/socket";

export default class MultiStage extends Phaser.Scene {
  init() {
    socket.emit("gameInit");

    this.registry.values.score = {
      rabbit: 0,
      carrot: 0,
    };
  }

  create() {
    this.setTileMap();

    socket.on("loadPlayers", ({ player, otherPlayers }) => {
      this.player = new Hero(this, player.x, player.y, "hero");
      this.player.id = player.userId;
      this.player.role = player.role;

      this.otherPlayers = Object.values(otherPlayers).map((playerInfo) => {
        const player = new Hero(
          this,
          playerInfo.x,
          playerInfo.y,
          playerInfo.role === "rabbit" ? "hero" : "hero"
        );

        player.id = playerInfo.userId;
        player.id = playerInfo.role;

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

      this.player.setTint(0xfffc3b);

      this.playerQueuedPosition = {
        x: this.player.x,
        y: this.player.y,
      };

      this.setCamera();
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.setCoinToMap();

    // this.timer = this.time.delayedCall(10000, this.gameOver, [], this);
    // this.countDown = this.add.text(32, 32);
  }

  update(time, delta) {
    // this.countDown.setText("current" + this.timer.getProgress().toString().substr(0, 4));

    if (this.player) {
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
    }

    if (this.coinCount === 0) {
      this.stopGame();
    }
    
    socket.on("somePlayerMove", ({ x, y, id, anims }) => {
      const [targetPlayer] = this.otherPlayers.filter(
        (player) => player.id === id
      );

      targetPlayer.x = x;
      targetPlayer.y = y;
      targetPlayer.play(anims, true);
    });

    socket.on("updateCount", ({ score }) => {
      this.registry.values.score = { ...score };
      console.log(this.registry.values);
    });

    socket.on("getGameResult", ({ result }) => {
      console.log(result);
      this.scene.pause();
    });
  }

  setTileMap() {
    this.map = this.add.tilemap("level1-map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");

    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);
    this.coinLayer = this.map.createLayer("Tile Layer 2", [tileset]);
  }

  setCamera() {
    this.cameras.main.setZoom(1.1);
    this.cameras.main.startFollow(this.player, true);
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
