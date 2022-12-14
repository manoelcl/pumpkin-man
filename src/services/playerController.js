import { MathUtils } from "three";

const DIRECTION_TO_ROTATION = [Math.PI, 0.5 * Math.PI, 0, -0.5 * Math.PI, 0];

const playerController = (
  player,
  selectedDirection,
  currentDirection,
  speed = 1,
  level,
  allowedStatic = true,
  cellSize = 1,
  delta = 0.01
) => {
  const side = level[0].length;
  const height = level.length;

  const absolutePosition = [
    -player.current.position.x + side * 0.5 - 0.5,
    -player.current.position.z + height * 0.5 - 0.5,
  ];

  const currentCell = [
    Math.floor(absolutePosition[0] + 0.5),
    Math.floor(absolutePosition[1] + 0.5),
  ];

  const getNeighbors = () => {
    const neighbors = [];
    if (
      absolutePosition[0].toFixed(1) === currentCell[0].toFixed(1) &&
      level[currentCell[1] - 1][currentCell[0]] !== 1
    )
      neighbors.push(0);

    if (
      absolutePosition[1].toFixed(1) === currentCell[1].toFixed(1) &&
      level[currentCell[1]][currentCell[0] + 1] !== 1
    )
      neighbors.push(1);

    if (
      absolutePosition[0].toFixed(1) === currentCell[0].toFixed(1) &&
      level[currentCell[1] + 1][currentCell[0]] !== 1
    )
      neighbors.push(2);

    if (
      absolutePosition[1].toFixed(1) === currentCell[1].toFixed(1) &&
      level[currentCell[1]][currentCell[0] - 1] !== 1
    )
      neighbors.push(3);

    return neighbors;
  };

  const neighbors = getNeighbors();

  switch (selectedDirection.current) {
    case 0:
      if (neighbors.includes(selectedDirection.current))
        currentDirection.current = selectedDirection.current;
      break;

    case 1:
      if (neighbors.includes(selectedDirection.current))
        currentDirection.current = selectedDirection.current;
      break;
    case 2:
      if (neighbors.includes(selectedDirection.current))
        currentDirection.current = selectedDirection.current;
      break;
    case 3:
      if (neighbors.includes(selectedDirection.current))
        currentDirection.current = selectedDirection.current;
      break;
  }
  /* console.log(currentCell); */
  /* console.log("current direction", currentDirection); */
  player.current.rotation.y = DIRECTION_TO_ROTATION[currentDirection.current];
  switch (currentDirection.current) {
    case 0:
      /* console.log("north"); */
      if (
        absolutePosition[1].toFixed(1) === currentCell[1].toFixed(1) &&
        level[currentCell[1] - 1][currentCell[0]] === 1
      ) {
        if (!allowedStatic) {
          const randomNeighbor =
            neighbors[MathUtils.randInt(0, neighbors.length - 1)];
          currentDirection.current = randomNeighbor;
          selectedDirection.current = randomNeighbor;
          return;
        }
        currentDirection.current = 4;
        return console.log("limit north");
      }
      player.current.position.z += speed * delta;
      break;
    case 1:
      /* console.log("east"); */
      if (
        absolutePosition[0].toFixed(1) === currentCell[0].toFixed(1) &&
        level[currentCell[1]][currentCell[0] + 1] === 1
      ) {
        if (!allowedStatic) {
          const randomNeighbor =
            neighbors[MathUtils.randInt(0, neighbors.length - 1)];
          currentDirection.current = randomNeighbor;
          selectedDirection.current = randomNeighbor;
          return;
        }
        currentDirection.current = 4;
        return console.log("limit east");
      }
      player.current.position.x -= speed * delta;
      break;
    case 2:
      /* console.log("south"); */
      if (
        absolutePosition[1].toFixed(1) === currentCell[1].toFixed(1) &&
        level[currentCell[1] + 1][currentCell[0]] === 1
      ) {
        if (!allowedStatic) {
          const randomNeighbor =
            neighbors[MathUtils.randInt(0, neighbors.length - 1)];
          currentDirection.current = randomNeighbor;
          selectedDirection.current = randomNeighbor;
          return;
        }
        currentDirection.current = 4;
        return console.log("limit south");
      }
      player.current.position.z -= speed * delta;
      break;
    case 3:
      /* console.log("west"); */
      if (
        absolutePosition[0].toFixed(1) === currentCell[0].toFixed(1) &&
        level[currentCell[1]][currentCell[0] - 1] === 1
      ) {
        if (!allowedStatic) {
          const randomNeighbor =
            neighbors[MathUtils.randInt(0, neighbors.length - 1)];
          currentDirection.current = randomNeighbor;
          selectedDirection.current = randomNeighbor;
          return;
        }
        currentDirection.current = 4;
        return console.log("limit west");
      }
      player.current.position.x += speed * delta;
      break;

    default:
      /* console.log(currentDirection); */
      break;
  }
};
export default playerController;
