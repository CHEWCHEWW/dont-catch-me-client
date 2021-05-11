import Phaser from "phaser";

import { TileSize } from "../../constants/tile";

const Moves = {
  None: "None",
  Left: "Left",
  Right: "Right",
  Up: "Up",
  Down: "Down"
};

const HeroState = {
  Normal: "Normal",
};

export default class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.lastKeyDown = Moves.None;

    this.heroState = HeroState.Normal;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (this.heroState === HeroState.Normal) {
      return;
    }

    this.body.setImmovable(false);
  }

  handleMovement(delta, cursors, boardLayer) {
    this.body.setVelocity(0, 0);

    const velocity = this.body.velocity;

    if (!velocity.lengthSq()) {
      this.lastKeyDown = Moves.None;
    }
    
    const keysDown = this.getKeysDownState(cursors);
    const speed = 200;

    if (keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("hero-running-back-left", true);
        this.body.setVelocity(-speed, -speed * 0.5);
        this.lastKeyDown = Moves.Left;
      }
    } else if (keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("hero-running-right", true);
        this.body.setVelocity(speed, speed * 0.5);
        this.lastKeyDown = Moves.Right;
      }
    } else if (keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x - 1, this.y + TileSize.y - 0.5)) {
        this.play("hero-running-back-right", true);
        this.body.setVelocity(speed, -speed * 0.5);
        this.lastKeyDown = Moves.Up;
      }
    } else if (keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x - TileSize.x + 1, this.y + TileSize.y + 0.5)) {
        this.play("hero-running-left", true);
        this.body.setVelocity(-speed, speed * 0.5);
        this.lastKeyDown = Moves.Down;
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
}
