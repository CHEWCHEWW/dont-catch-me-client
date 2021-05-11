import Phaser from "phaser";

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
    
    this.queuedMove = Moves.None;
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
    const velocity = this.body.velocity;

    if (!velocity.lengthSq()) {
      this.lastKeyDown = Moves.None;
    }

    const keysDown = this.getKeysDownState(cursors);
    
    if (keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x - 64, this.y - 32)) {
        this.lastKeyDown = Moves.Left;
      } else {
        this.lastKeyDown = Moves.None;
      }
    } else if (keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x + 64, this.y - 32)) {
        this.lastKeyDown = Moves.Right;
      } else {
        this.lastKeyDown = Moves.None; 
      }
    } else if (keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x - 64, this.y + 32)) {
        this.lastKeyDown = Moves.Up;
      } else {
        this.lastKeyDown = Moves.None; 
      }
    } else if (keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x + 64, this.y + 32)) {
        this.lastKeyDown = Moves.Down;
      } else {
        this.lastKeyDown = Moves.None; 
      }
    }

    const speed = 200;

    switch (this.lastKeyDown) {
      case Moves.Left: {
        this.body.setVelocity(-speed, -speed * 0.5);
        break;
      }
      case Moves.Right: {
        this.play("hero-running-right", true);
        this.body.setVelocity(speed, speed * 0.5);
        break;
      }
      case Moves.Up: {
        this.body.setVelocity(speed, -speed * 0.5);
        break;
      }
      case Moves.Down: {
        this.play("hero-running-left", true);
        this.body.setVelocity(-speed, speed * 0.5);
        break;
      }
      case Moves.None: {
        this.body.setVelocity(0, 0);
        break;
      }
      default: {
        break;
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
