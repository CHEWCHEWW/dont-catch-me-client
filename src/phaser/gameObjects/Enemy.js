import Phaser from "phaser";

import { Direction } from "../../constants/direction";

export default class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture) {
    super(scene, x, y, texture);

    this.lastDirection = Direction.None;
    this.lastTilePosition = { x: 0, y: 0 };

    this.targetIndicator = scene.add
      .text(0, 0, "x")
      .setOrigin(0.5)
      .setDepth(1000);

    this.enableTargetMarker(true);
  }

  setTargetIndicatorColor(color) {
    this.targetIndicator.setColor(color);
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

    const x = body.position.x;
    const y = body.position.y;

    const gx = Math.floor(x / 128) * 128;
    const gy = Math.floor(y / 64) * 64;

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
        this.play("hero-idle-back-left", true);
        body.setVelocity(-speed, -speed * 0.5);
        break;
      }
      case Direction.Right: {
        this.play("hero-idle-right", true);
        body.setVelocity(speed, speed * 0.5);
        break;
      }
      case Direction.Up: {
        this.play("hero-idle-back-right", true);
        body.setVelocity(speed, -speed * 0.5);
        break;
      }
      case Direction.Down: {
        this.play("hero-idle-left", true);
        body.setVelocity(-speed, speed * 0.5);
        break;
      }
      case Direction.None: {
        body.setVelocity(0, 0);
      }
      default: {
        break;
      }
    }
  }
  
  setAI(ai) {
    this.ai = ai;
  }

  unSubscribeAI() {
    this.ai = null;
    this.body.setVelocity(0, 0);
  }

  enableTargetMarker(isEnable) {
    this.targetIndicator.setVisible(isEnable);
  }
}
