import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { TileSize } from "../../constants/tile";
import { 
  determineDirectionByTarget,
} from "../../utils/directions";

export default class RotateAI {
  constructor(target, enemy, board) {
    this.target = target;
    this.enemy = enemy;
    this.board = board;
    this.speed = 80;
    this.lastDirection = Direction.None;
    this.lastDistance = -1;
  }

  get targetPosition() {
    return {
      x: this.target.x,
      y: this.target.y,
    };
  }

  getLastDistance() {
    return Phaser.Math.Distance.Between(
      this.target.x, 
      this.target.y, 
      this.enemy.x, 
      this.enemy.y,
    );
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.target;
    const { x: currentX, y: currentY } = this.enemy;

    const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

    return determineDirectionByTarget({
      targetX,
      targetY,
      currentX,
      currentY,
      directions,
      board: this.board,
    });
  }
}
