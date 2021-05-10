import Phaser from "phaser";

import { Direction } from "../ai/EnemyAI";

export default class Enemy extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.lastDirection = Direction.None;

    this.lastTilePosition = { x: -1, y: -1 };

    this.enemy = scene.add.sprite(128, 128, "hero");

    this.add(this.enemy);
  }

  preUpdate(time, delta) {
    if (!this.aiBehavior) {
      return;
    }

    this.scene.physics.world.wrapObject(this, 128);
  }
}
