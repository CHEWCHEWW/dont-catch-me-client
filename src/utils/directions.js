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
			return Direction.Right
		case Direction.Right:
			return Direction.Left
		case Direction.Up:
			return Direction.Down
		case Direction.Down:
			return Direction.Up
	}
};
