import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { 
  determineDirectionByTarget,
  determineRotationDirection,
  getSideDirection,
} from "../../utils/directions";

export default class RotateAI {
  constructor(target, enemy, board, center) {
    this.target = target;
    this.enemy = enemy;
    this.board = board;
    this.speed = 80;
    this.lastDirection = Direction.None;
  }

  get targetPosition() {
    return {
      x: this.target.x,
      y: this.target.y,
    };
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.hero;
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
