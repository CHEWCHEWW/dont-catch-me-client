import Phaser from "phaser";

import { Direction } from "../../constants/direction";
import { TileSize } from "../../constants/tile";
import { determineDirectionByTarget } from "../../utils/directions";

export default class ConditionalChaseAI {
  constructor(hero, enemy, board, rotateAI) {
    this.hero = hero;
    this.enemy = enemy;
    this.board = board;
    this.speed = 80;
    this.lastDirection = Direction.None;
    this.normalAI = rotateAI;
    this.currentTargetPosition = { x: -1, y: -1 };
  }

  get targetPosition() {
    return {
      x: this.currentTargetPosition.x,
      y: this.currentTargetPosition.y,
    };
  }

  pickDirection() {
    const { x: targetX, y: targetY } = this.hero;
    const { x: currentX, y: currentY } = this.enemy;

    const lastDistanceInRotating = this.normalAI.getLastDistance();

    if (lastDistanceInRotating > TileSize.y * 7) {
      this.speed = 80;
      this.currentTargetPosition = this.normalAI.targetPosition;
      
      return this.normalAI.pickDirection();
    }

    const distance = Phaser.Math.Distance.Between(
      targetX,
      targetY,
      currentX,
      currentY,
    );

    const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

    if (distance < TileSize.y * 5) {
      this.speed = 150;

      this.currentTargetPosition.x = targetX;
      this.currentTargetPosition.y = targetY;

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
}