import Phaser from "phaser";

import { Direction } from "../../constants/direction";

export default class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.lastDirection = Direction.None;
    this.lastTilePosition = { x: -1, y: -1 };

    this.enemy = scene.add.sprite(0, 0, "hero");
    this.add(this.enemy);

    this.targetIndicator = scene.add
      .text(0, 0, "x")
      .setOrigin(0.5)
      .setDepth(1000);

    this.enableTargetMarker(true);
  }

  get currentDirection() {
    return this.lastDirection;
  }

  setAI(ai) {
    this.ai = ai;

    return this;
  }

  enableTargetMarker(isEnable) {
    this.targetIndicator.setVisible(isEnable);

    return this;
  }

  preUpdate(time, delta) {
    if (!this.ai) {
      return;
    }

    const body = this.body;

    body.setImmovable(false);

    const x = body.position.x;
    const y = body.position.y;

    if (
      !Phaser.Geom.Rectangle.Contains(this.scene.physics.world.bounds, x, y)
    ) {
      return;
    }

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
    const direction = this.ai.pickDirection();
    const targetPosition = this.ai.targetPosition;

    this.targetIndicator.setPosition(targetPosition.x, targetPosition.y);
    
    switch (direction) {
      case Direction.Left: {
        body.setVelocity(-speed, -speed * 0.5);
        break;
      }
      case Direction.Right: {
        this.enemy.play("hero-running-right", true);
        body.setVelocity(speed, speed * 0.5);
        break;
      }
      case Direction.Up: {
        body.setVelocity(speed, -speed * 0.5);
        break;
      }
      case Direction.Down: {
        this.enemy.play("hero-running-left", true);
        body.setVelocity(-speed, speed * 0.5);
        break;
      }
      default: {
        break;
      }
    }

    this.lastDirection = direction;
  }
}
