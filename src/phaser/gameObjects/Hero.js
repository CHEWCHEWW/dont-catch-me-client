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
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.heroState === HeroState.Normal) {
      return;
    }

    this.play("enemy-idle-left");
  }

  handleMovement(delta, cursors, boardLayer) {
    if (!cursors) {
      return;
    }

    const body = this.body;

    body.setVelocity(0, 0);

    this.keysDown = this.getKeysDownState(cursors);
    
    const speed = 200;

    if (this.keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("enemy-running-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);

        this.lastDirection = Direction.Left;
      }
    } else if (this.keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("enemy-running-right", true);
        body.setVelocity(speed, speed * 0.5);

        this.lastDirection = Direction.Right;
      }
    } else if (this.keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("enemy-running-back-right", true);
        body.setVelocity(speed, -speed * 0.5);

        this.lastDirection = Direction.Up;
      }
    } else if (this.keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("enemy-running-left", true);
        body.setVelocity(-speed, speed * 0.5);

        this.lastDirection = Direction.Down;
      }
    } 
    // else {
    //   switch (this.lastDirection) {
    //     case Direction.Left: {
    //       this.play("enemy-idle-back-left");
    //       break;
    //     }
    //     case Direction.Right: {
    //       console.log("right");
    //       this.play("enemy-idle-right");
    //       break;
    //     }
    //     case Direction.Up: {
    //       this.play("enemy-idle-back-right");
    //       break;
    //     }
    //     case Direction.Down: {
    //       this.play("enemy-idle-left");
    //       break;
    //     }
    //     default:
    //       break;
    //   }
    // }
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
    this.play("hero-idle-left");
    this.body.setVelocity(0, 0);
  }

  canGetCoin(coin) {
		const heroPosition = this.body.position

		const coinPosition = coin.body.position.clone();

		coinPosition.x -= coin.body.offset.x
		coinPosition.y -= coin.body.offset.y

    return Phaser.Math.Distance.BetweenPointsSquared(heroPosition, coinPosition) <= 7000;
	}
}
