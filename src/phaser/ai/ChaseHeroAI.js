import {
  getOrderedDirections,
  getSideDirection,
  getPositionByDirection,
} from "../../utils/directions";
import { Direction } from "../../constants/direction";
import { shuffleOrder } from "../../utils/random";

export default class ChaseHeroAI {
  constructor(hero, enemy, board) {
    this.hero = hero;
    this.enemy = enemy;
    this.board = board;
  }

  get speed() {
    return 100;
  }

  get targetPosition() {
    return {
      x: this.hero.x,
      y: this.hero.y,
    };
  }

  pickDirection() {
    let lastClosedDirection = Direction.None;
    let lastClosedDistance = -1;

    const targetX = this.hero.x;
    const targetY = this.hero.y;

    const currentX = this.enemy.x;
    const currentY = this.enemy.y;
    
    const sideDirection = getSideDirection(this.enemy.currentDirection);
    const directions = getOrderedDirections((direction) => direction !== sideDirection);
    const shuffledDirections = shuffleOrder(directions);
    
    for (const direction of shuffledDirections) {
      const position = getPositionByDirection(currentX, currentY, direction);
      
      if (!this.board.getTileAtWorldXY(position.x + 12, position.y + 60)) {
        continue;
      }

      const distance = Phaser.Math.Distance.Between(
        position.x,
        position.y,
        targetX,
        targetY
      );
      
      if (
        lastClosedDirection === Direction.None ||
        distance < lastClosedDistance
      ) {
        lastClosedDirection = direction;
        lastClosedDistance = distance;
      }
    }

    return lastClosedDirection !== Direction.None ? lastClosedDirection : sideDirection;
  }
}
