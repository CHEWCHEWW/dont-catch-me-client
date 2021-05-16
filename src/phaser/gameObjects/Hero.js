import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { TileSize } from "../../constants/tile";

const HeroState = {
  Normal: "Normal",
  Powered: "Powered"
};

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.heroState = HeroState.Normal;
    this.lastDirection = Direction.None;

    this.targetIndicator = scene.add
      .text(0, 0, "x")
      .setOrigin(2)
      .setDepth(1000);

    this.targetIndicator.setColor('#FF0400');
    this.targetIndicator.setVisible(true);
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.heroState === HeroState.Normal) {
      return;
    }
  }

  getCoin() {
    this.coinMessage = this.scene.add.image(this.x, this.y - 50, "add-coin");

    this.scene.time.addEvent({
      callback: () => {
        this.coinMessage.setVisible(false);
      },
      delay: 200,
    });
  }

  handleMovement(delta, cursors, boardLayer) {
    if (!cursors) {
      return;
    }

    const body = this.body;

    body.setVelocity(0, 0);

    this.keysDown = this.getKeysDownState(cursors);
    
    const speed = 200;
    this.targetIndicator.setPosition(this.x + 12, this.y + 60);

    if (this.keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 - TileSize.x, this.y + 60 - TileSize.y)) {
        this.play("hero-idle-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);

        this.lastDirection = Direction.Left;
      }
    } else if (this.keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 + TileSize.x, this.y + 60 + TileSize.y)) {
        this.play("hero-idle-right", true);
        body.setVelocity(speed, speed * 0.5);

        this.lastDirection = Direction.Right;
      }
    } else if (this.keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 + TileSize.x, this.y + 60 - TileSize.y)) {
        this.play("hero-idle-back-right", true);
        body.setVelocity(speed, -speed * 0.5);

        this.lastDirection = Direction.Up;
      }
    } else if (this.keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x + 12 - TileSize.x, this.y + 60 + TileSize.y)) {
        this.play("hero-idle-left", true);
        body.setVelocity(-speed, speed * 0.5);

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

  setDie() {
    this.play("hero-die-right", true);
    this.body.setVelocity(0, 0);
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
        this.play("enemy-idle-back-left");
        break;
      }
      case Direction.Right: {
        this.play("enemy-idle-right");
        break;
      }
      case Direction.Up: {
        this.play("enemy-idle-back-right");
        break;
      }
      case Direction.Down: {
        this.play("enemy-idle-left");
        break;
      }
      default:
        break;
    }
  }
}
