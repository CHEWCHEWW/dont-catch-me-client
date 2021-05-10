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

export class Hero extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);
    
    this.queuedMove = Moves.None;
    this.lastKeyDown = Moves.None;
    this.queuedMoveAccumulator = 0;

    this.heroState = HeroState.Normal;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    this.scene.physics.world.wrapObject(this, 128);

    if (this.heroState === HeroState.Normal) {
      return;
    }
  }

  handleMovement(delta, cursors, boardLayer) {
    const keysDown = this.getKeysDownState(cursors);
    
    if (keysDown.left) {
      if (boardLayer.getTileAtWorldXY(this.x - 128, this.y - 64)) {
        this.queuedMove = Moves.Left; 
      }
    } else if (keysDown.right) {
      if (boardLayer.getTileAtWorldXY(this.x + 128, this.y + 64)) {
        this.queuedMove = Moves.Right;
      }
    } else if (keysDown.up) {
      if (boardLayer.getTileAtWorldXY(this.x - 128, this.y + 64)) {
        this.queuedMove = Moves.Up;
      }
    } else if (keysDown.down) {
      if (boardLayer.getTileAtWorldXY(this.x + 128, this.y - 64)) {
        this.queuedMove = Moves.Down;
      }
    }

    switch (this.queuedMove) {
      case Moves.Left: {
        this.lastKeyDown = this.queuedMove;
        this.queuedMove = Moves.None;

        break;
      }
      case Moves.Right: {
        this.lastKeyDown = this.queuedMove;
        this.queuedMove = Moves.None;

        break;
      }
      case Moves.Up: {
        this.lastKeyDown = this.queuedMove;
        this.queuedMove = Moves.None;

        break;
      }
      case Moves.Down: {
        this.lastKeyDown = this.queuedMove;
        this.queuedMove = Moves.None;

        break;
      }
      case Moves.None: {
        break;
      }
      default: {
        break;
      }
    }

    const speed = 100;

    switch (this.lastKeyDown) {
      case Moves.Left: {
        this.body.setVelocity(-speed, -speed);

        break;
      }
      case Moves.Right: {
        this.body.setVelocity(speed, speed);
        
        break;
      }
      case Moves.Up: {
        this.body.setVelocity(speed, -speed);

        break;
      }
      case Moves.Down: {
        this.body.setVelocity(-speed, speed);

        break;
      }
      default:
        break;
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
