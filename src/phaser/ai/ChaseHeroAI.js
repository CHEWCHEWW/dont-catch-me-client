import {
  getOrderedDirections,
  getOppositeDirection,
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
    return 150;
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

    const targetX = this.hero.body.position.x;
    const targetY = this.hero.body.position.y;

    const currentX = this.enemy.body.position.x;
    const currentY = this.enemy.body.position.y;
    
    const backwardsPosition = getOppositeDirection(this.enemy.currentDirection);
    
    const directions = getOrderedDirections();
    const shuffledDirections = shuffleOrder(directions);
    
    for (const direction of shuffledDirections) {
      const position = getPositionByDirection(currentX, currentY, direction);
      
      if (!this.board.getTileAtWorldXY(position.x, position.y)) {
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

    return lastClosedDirection;
  }
}
