export default function getCoordBoundaries (gridWidth, gridHeight) {
  const halfWidth = gridWidth / 2;
  const halfHeight = gridHeight / 2;

  return {
    minCol: 1 - Math.round(halfWidth),
    maxCol: Math.floor(halfWidth),
    minRow: 1 - Math.round(halfHeight),
    maxRow: Math.floor(halfHeight),
  };
};
