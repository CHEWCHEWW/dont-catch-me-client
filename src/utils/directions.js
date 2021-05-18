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
      return Direction.Up;
    case Direction.Right:
      return Direction.Down;
    case Direction.Up:
      return Direction.Lsft;
    case Direction.Down:
      return Direction.Right;
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
