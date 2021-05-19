import { Direction } from "../constants/direction";
import { TileSize } from "../constants/tile";

export const getOrderedDirections = (filter) => {
  const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

  if (!filter) {
    return directions;
  }

  return directions.filter(filter);
};

export const getSideDirection = (direction) => {
  switch (direction) {
    case Direction.Left:
      return Direction.Down;
    case Direction.Right:
      return Direction.Up;
    case Direction.Up:
      return Direction.Right;
    case Direction.Down:
      return Direction.Right;
    default:
      break;
  }
};

export const getPositionByDirection = (x, y, direction) => {
  switch (direction) {
    case Direction.Up: {
      return { x: x + TileSize.x, y: y - TileSize.y };
    }
    case Direction.Down: {
      return { x: x - TileSize.x, y: y + TileSize.y };
    }
    case Direction.Left: {
      return { x: x - TileSize.x, y: y - TileSize.y };
    }
    case Direction.Right: {
      return { x: x + TileSize.x, y: y - TileSize.y };
    }
    default: {
      break;
    }
  }
};

export const determineRotationDirection = ({ 
  currentX, 
  currentY, 
  lastDirection, 
  directions, 
  board 
}) => { 
  const { x: directionX, y: directionY } = getPositionByDirection(currentX, currentY, lastDirection);
  
  const currentDirectionDistnace = Phaser.Math.Distance.Between(
    directionX,
    directionY,
    currentX,
    currentY,
  );
  
  if (board.getTileAtWorldXY(directionX + 12, directionY + 60) && currentDirectionDistnace < 350) {
    return lastDirection;
  }

  for (const direction of directions) {
    const { x: positionX, y: positionY } = getPositionByDirection(currentX, currentY, direction);
    
    if (!board.getTileAtWorldXY(positionX + 12, positionY + 60)) {
      continue;
    }

    const distance = Phaser.Math.Distance.Between(
      positionX,
      positionY,
      currentX,
      currentY
    );
    
    if (distance < 350 || direction === Direction.None) {
      return direction;
    }
  }

  return false;
};

export const determineDirectionByTarget = ({
  targetX, 
  targetY, 
  currentX, 
  currentY, 
  directions, 
  board, 
  oppositeDirection,
}) => {
  let lastClosedDirection = Direction.None;
  let lastClosedDistance = -1;
  
  for (const direction of directions) {
    const { x: positionX, y: positionY } = getPositionByDirection(currentX, currentY, direction);
    
    if (!board.getTileAtWorldXY(positionX + 12, positionY + 60)) {
      continue;
    }

    const distance = Phaser.Math.Distance.Between(
      positionX,
      positionY,
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

  return lastClosedDirection !== Direction.None ? lastClosedDirection : oppositeDirection;
};
