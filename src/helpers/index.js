export const findCoordinates = (map, element) => {
  for (const [row, cells] of map.entries()) {
    const index = cells.findIndex((cell) => cell === element);

    if (index >= 0) {
      return [index, row];
    }
  }

  return [0, 0];
};

function setCoords(column, cellRow, row, height = 0, cellSize = 1) {
  return [
    cellSize * (-column + (cellRow.length - 1) * 0.5),
    height,
    cellSize * (-row + (cellRow.length - 1) * 0.5),
  ];
}

export const setLevelsInfo = (levels) => {
  const levelsInfo = {};
  console.log("hols");
  for (const [name, level] of Object.entries(levels)) {
    const walls = [];
    const candies = [];
    const enemies = [];
    const players = [];

    level.forEach((cellRow, row) =>
      cellRow.forEach((cell, column) => {
        switch (cell) {
          case 0:
            candies.push({
              id: [column, row],
              coords: setCoords(column, cellRow, row, 0.25),
            });
            break;
          case 1:
            walls.push({
              id: [column, row],
              coords: setCoords(column, cellRow, row, -0.25),
            });
            break;
          case 2:
            players.push({
              id: "player1",
              coords: setCoords(column, cellRow, row, 0),
            });
            break;
          case 3:
            players.push({
              id: "player2",
              coords: setCoords(column, cellRow, row, 0),
            });
            break;
        }
      })
    );

    levelsInfo[name] = { walls, candies, enemies, players };
  }
  return levelsInfo;
};
