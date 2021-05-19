import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { TileSize } from "../../constants/tile";

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.lastDirection = Direction.None;

    this.speed = 150;

    this.play("hero-idle-left");

    // this.targetIndicator = scene.add
    //   .text(0, 0, "x")
    //   .setOrigin(2)
    //   .setDepth(1000);

    // this.targetIndicator.setColor('#FF0400');
    // this.targetIndicator.setVisible(true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
  }

  getCoin() {
    this.coinMessage = this.scene.add.image(this.x, this.y - 50, "add-coin").setDepth(7);

    this.scene.time.addEvent({
      callback: () => {
        this.coinMessage.setVisible(false);
      },
      delay: 200,
    });
  }

  handleMovement(cursors, boardLayer) {
    if (!cursors) {
      return;
    }
    
    const body = this.body;

    body.setVelocity(0, 0);
    
    // this.setIdlePlay();

    this.keysDown = this.getKeysDownState(cursors);
    
    // this.targetIndicator.setPosition(this.x + 12, this.y + 60);
    
    if (this.keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 - TileSize.x, this.y + 60 - TileSize.y)) {
        this.play("hero-running-back-left", true);
        body.setVelocity(-this.speed, -this.speed * 0.5);

        this.lastDirection = Direction.Left;
      }
    } else if (this.keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 + TileSize.x, this.y + 60 + TileSize.y)) {
        this.play("hero-running-right", true);
        body.setVelocity(this.speed, this.speed * 0.5);

        this.lastDirection = Direction.Right;
      }
    } else if (this.keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 + TileSize.x, this.y + 60 - TileSize.y)) {
        this.play("hero-running-back-right", true);
        body.setVelocity(this.speed, -this.speed * 0.5);

        this.lastDirection = Direction.Up;
      }
    } else if (this.keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 - TileSize.x, this.y + 60 + TileSize.y)) {
        this.play("hero-running-left", true);
        body.setVelocity(-this.speed, this.speed * 0.5);

        this.lastDirection = Direction.Down;
      }
    } 
  }

  getKeysDownState(cursors) {
    return {
      left: cursors.left?.isDown,
      right: cursors.right?.isDown,
      up: cursors.up?.isDown,
      down: cursors.down?.isDown
    };
  }

  setWin() {
    this.body.setVelocity(0, 0);

    this.resultMessasge = this.scene.add.image(this.x, this.y - 100, "win").setDepth(7);
  }

  setLose() {
    this.body.setVelocity(0, 0);

    this.resultMessasge = this.scene.add.image(this.x, this.y - 100, "lose").setDepth(7);
    this.play("hero-die-right", true);
  }

  canGetCoin(coin) {
		const heroPosition = this.body.position

		const coinPosition = coin.body.position.clone();

		coinPosition.x -= coin.body.offset.x
		coinPosition.y -= coin.body.offset.y

    return Phaser.Math.Distance.BetweenPointsSquared(heroPosition, coinPosition) <= 7000;
	}

  setIdlePlay() {
    switch (this.lastDirection) {
      case Direction.Left: {
        this.play("hero-running-back-left");
        break;
      }
      case Direction.Right: {
        this.play("hero-running-right");
        break;
      }
      case Direction.Up: {
        this.play("hero-running-back-right");
        break;
      }
      case Direction.Down: {
        this.play("hero-running-left");
        break;
      }
      default:
        break;
    }
  }
}
