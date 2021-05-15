import Hero from "../gameObjects/Hero";
import Enemy from "../gameObjects/Enemy";

import { socket } from "../../utils/socket";

export default class Multiplayer extends Phaser.Scene {
  constructor() {
    super("stage1");
  }

  init() {
    socket.emit("gameInit");
  }

  create() {
    this.map = this.add.tilemap("level1-map");

    const tileset = this.map.addTilesetImage("iso-level1", "tiles");
    
    this.otherPlayers = [];
    
    this.boardLayer = this.map.createLayer("Tile Layer 1", [tileset]);
    // this.coinLayer = this.map.createLayer("Tile Layer 2", [tileset]);

    socket.on("loadPlayers", ({ player, otherPlayers }) => {
      this.player = new Hero(this, player.x, player.y, "hero");
      this.otherPlayers = Object.values(otherPlayers).map((playerInfo) => {
        const player = new Hero(this, playerInfo.x, playerInfo.y, playerInfo.role === "rabbit" ? "hero" : "hero");

        player.id = playerInfo.userId;

        return player;
      });
      
      this.physics.world.enable([this.player, ...this.otherPlayers], Phaser.Physics.Arcade.DYNAMIC_BODY);

      this.add.existing(this.player);
      this.player.body.setSize(64, 120, true);
      this.player.setTint(0xfffc3b);
      console.log(this.player.body.x);
      console.log(this.player.x);
      this.otherPlayers.forEach((player) => {
        this.add.existing(player);

        player.body.setSize(64, 120, true);
      });

      this.playerQueuedPosition = {
        x: this.player.x,
        y: this.player.y,
      };

      this.cameras.main.setZoom(0.5);
      this.cameras.main.startFollow(this.player, true);
    });
    
    this.cursors = this.input.keyboard.createCursorKeys();

    // this.setCoinToMap();

    // // this.timer = this.time.delayedCall(10000, this.gameOver, [], this);
    // this.countDown = this.add.text(32, 32);


    // this.physics.add.collider(this.hero, [this.enemy, this.enemy1], () => {
    //   // this.stopGame();
    //   // this.moveNextStage();
    // });

    // // if (this.hero) {
		// // 	this.physics.add.overlap(this.hero, this.coins, this.handlePlayerGetCoin, this.checkIsCanPlayerGetCoin, this);
		// // }
  }

  update(time, delta) {

    // this.countDown.setText("current" + this.timer.getProgress().toString().substr(0, 4));
    this.player?.handleMovement(delta, this.cursors, this.boardLayer);
    
    if (this.player) {
      if (this.player.x !== this.playerQueuedPosition.x || this.player?.y !== this.playerQueuedPosition.y) {
        socket.emit("movePlayer", { x: this.player?.x, y: this.player?.y });
      }
    }

    socket.on("somePlayerMove", ({ x, y, id }) => {
      console.log(id);
      console.log(this.otherPlayers);
      const [targetPlayer] = this.otherPlayers.filter((player) => player.id === id);
      console.log(targetPlayer);
      targetPlayer.x = x;
      targetPlayer.y = y;
    });
    if (this.coinCount === 0) {
      this.moveNextStage();
    }
  }

  // setCoinToMap() {
  //   this.coins = this.coinLayer.createFromTiles(6, -1, { key: "coin" });

  //   this.coinCount = this.coins.length;

  //   this.coins.forEach((coin) => {
	// 		this.physics.add.existing(coin);
	// 		const body = coin.body;

	// 		body.setCircle(38, 26, -6);
	// 	});
  // }

  stopGame() {
    this.time.addEvent({
      callback: () => {
        this.scene.pause();
        // store.dispatch(updateGameProgress(gameProgress.GAME_OVER));
      },
      delay: 1000,
    });
  }

  moveNextStage() {
    this.time.addEvent({
      callback: () => {
        this.scene.pause();
      },
      delay: 1000,
    });
  }

  // handlePlayerGetCoin(object1, object2) {
  //   object2.destroy(true);

  //   this.coinCount--;
	// }

	// checkIsCanPlayerGetCoin(object1, object2) {
	// 	if (!this.hero) {
	// 		return false;
	// 	}
    
	// 	return this.hero.canGetCoin(object2);
	// }
}
