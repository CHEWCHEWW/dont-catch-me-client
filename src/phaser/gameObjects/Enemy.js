import Phaser from "phaser";

import { Direction } from "../../constants/direction";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.lastDirection = Direction.None;
    this.lastTilePosition = { x: -1, y: -1 };

    this.targetIndicator = scene.add
      .text(0, 0, "x")
      .setOrigin(0.5)
      .setDepth(1000);

    this.enableTargetMarker(true);
  }

  get currentDirection() {
    return this.lastDirection;
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);

    if (!this.ai) {
      return;
    }
    
    const body = this.body;

    body.setBounce(0).setCollideWorldBounds(false);

    const x = body.position.x;
    const y = body.position.y;

    const gx = Math.floor(x / 128) * 128;
    const gy = Math.floor(y / 128) * 128;

    if (this.lastTilePosition.x === gx && this.lastTilePosition.y === gy) {
      return;
    }

    body.position.x = gx;
    body.position.y = gy;

    this.lastTilePosition.x = gx;
    this.lastTilePosition.y = gy;

    const speed = this.ai.speed;
    const targetPosition = this.ai.targetPosition;

    this.targetIndicator.setPosition(targetPosition.x, targetPosition.y);

    const direction = this.ai.pickDirection();
    
    switch (direction) {
      case Direction.Left: {
        this.play("hero-running-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);
        break;
      }
      case Direction.Right: {
        this.play("hero-running-right", true);
        body.setVelocity(speed, speed * 0.5);
        break;
      }
      case Direction.Up: {
        this.play("hero-running-back-right", true);
        body.setVelocity(speed, -speed * 0.5);
        break;
      }
      case Direction.Down: {
        this.play("hero-running-left", true);
        body.setVelocity(-speed, speed * 0.5);
        break;
      }
      default: {
        break;
      }
    }

    this.lastDirection = direction;
  }
  
  setAI(ai) {
    this.ai = ai;
  }

  enableTargetMarker(isEnable) {
    this.targetIndicator.setVisible(isEnable);
  }
}
