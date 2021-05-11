import { Direction } from "../constants/direction";
import { TileSize } from "../constants/tile";

export const getOrderedDirections = (filter) => {
  const directions = [Direction.Up, Direction.Left, Direction.Down, Direction.Right];

  if (!filter) {
    return directions;
  }

  return directions.filter(filter);
};

export const getOppositeDirection = (direction) => {
switch (direction) {
  case Direction.Left:
    return Direction.Right;
  case Direction.Right:
    return Direction.Left;
  case Direction.Up:
    return Direction.Down;
  case Direction.Down:
    return Direction.Up;
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
