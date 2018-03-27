import { hexMapToArray } from './hexStructures';

function hexArrayReducer (acc, { col, row }) {
  if (acc.minCol === null || col < acc.minCol ) { acc.minCol = col; }
  if (acc.maxCol === null || col > acc.maxCol ) { acc.maxCol = col; }
  if (acc.minRow === null || row < acc.minRow ) { acc.minRow = row; }
  if (acc.maxRow === null || row > acc.maxRow ) { acc.maxRow = row; }

  return acc;
}

export default function getCoordBoundaries (activeHexesMap) {
  return hexMapToArray(activeHexesMap).reduce(
    hexArrayReducer,
    {
      minRow: null,
      maxRow: null,
      minCol: null,
      maxCol: null,
    }
  );
};
