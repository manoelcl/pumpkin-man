export const findCoordinates = (map, element) => {
  for (const [row, cells] of map.entries()) {
    const index = cells.findIndex((cell) => cell === element);

    if (index >= 0) {
      return [index, row];
    }
  }

  return [0, 0];
};
