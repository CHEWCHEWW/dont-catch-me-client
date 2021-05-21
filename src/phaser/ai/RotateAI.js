import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { 
  determineDirectionByTarget,
  getOppositeDirection,
  getOrderedDirections,
} from "../../utils/directions";

export default class RotateAI {
  constructor(target, enemy, board) {
    this.target = target;
    this.enemy = enemy;
    this.board = board;
    this.speed = 80;
    this.lastDistance = -1;
    this.lastDirection = enemy.currentDirection;
  }

  get targetPosition() {
    return {
      x: this.target.x,
      y: this.target.y,
    };
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.target;
    const { x: currentX, y: currentY } = this.enemy;

    const oppositeDirection = getOppositeDirection(this.enemy.currentDirection);
    const directions = getOrderedDirections((direction) => direction !== oppositeDirection);

    const distance = Phaser.Math.Distance.Between(
      targetX,
      targetY,
      currentX,
      currentY,
    );

    if (distance > 300) {
      this.lastDirection = determineDirectionByTarget({
        targetX,
        targetY,
        currentX,
        currentY,
        directions,
        board: this.board,
      });

      return this.lastDirection;
    }

    return this.lastDirection;
  }
}
