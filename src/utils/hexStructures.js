import { getNeighbourHexCoordinates, oddrToPixels, getHexLine, getHexCircle } from './hexMath';

function normalizeHex (item) {
  if (item instanceof Array) {
    return {
      col: item[0],
      row: item[1],
    };
  }

  return item;
}

function mapToArrayProcessSetEntry ([ row ]) {
  return { col: this.col, row };
}

function mapToArrayReducer (acc, [ col, set ]) {
  return [
    ...acc,
    ...Array.from(set.entries(), mapToArrayProcessSetEntry, { col }),
  ];
}

export function hexMapToArray (map) {
  return Array.from(map.entries()).reduce(mapToArrayReducer, []);
}

function arrayToMapReducer (acc, hex) {
  const { col, row } = normalizeHex(hex);

  if (!acc.has(col)) {
    acc.set(col, new Set());
  }

  acc.get(col).add(row);

  return acc;
}

export function hexArrayToMap (arr) {
  return arr.reduce(arrayToMapReducer, new Map());
}

export function mapHasHex (map, { col, row }) {
  const set = map.get(col);

  return set && set.has(row);
}

export function mapHasNeighbourHex (map, hex, direction) {
  return mapHasHex(map, getNeighbourHexCoordinates(hex, direction));
}

function getCoordBoundariesReducer (acc, { col, row }) {
  if (acc.minCol === null || col < acc.minCol ) { acc.minCol = col; }
  if (acc.maxCol === null || col > acc.maxCol ) { acc.maxCol = col; }
  if (acc.minRow === null || row < acc.minRow ) { acc.minRow = row; }
  if (acc.maxRow === null || row > acc.maxRow ) { acc.maxRow = row; }

  return acc;
}

export function getCoordBoundaries (hexes) {
  let arr;

  if (hexes instanceof Array) {
    arr = hexes;
  }
  else {
    arr = hexMapToArray(hexes);
  }

  return arr.map(normalizeHex).reduce(
    getCoordBoundariesReducer,
    {
      minRow: null,
      maxRow: null,
      minCol: null,
      maxCol: null,
    }
  );
}

export function getCenterPixels (area) {
  const { minRow, maxRow, minCol, maxCol } = getCoordBoundaries(area);
  return  oddrToPixels({ row: (minRow + maxRow) / 2, col: (minCol + maxCol) / 2 });
}

export function stateArrayHasHex (arr, hex) {
  const target = normalizeHex(hex);
  return !!arr.find(([ col, row ]) => target.row === row && target.col === col);
}

export function addToStateArray (arr, hex) {
  const found = stateArrayHasHex(arr, hex);
  const target = normalizeHex(hex);

  if (!found) {
    return [...arr, [ target.col, target.row ]];
  }

  return arr;
}

export function removeFromStateArray (arr, hex) {
  const target = normalizeHex(hex);
  return arr.filter(([ col, row ]) => target.row !== row || target.col !== col);
}

export function getRectHexAreaAsStateArray (from , to) {
  const { minCol, maxCol, minRow, maxRow } = getCoordBoundaries([from, to]);
  let arr = [];

  for (let col = minCol; col <= maxCol; col++) {
    for (let row = minRow; row <= maxRow; row++) {
      arr.push([col, row]);
    }
  }

  return arr;
}

export function getLineHexAreaAsStateArray (from , to) {
  return getHexLine(normalizeHex(from), normalizeHex(to)).map(({ col, row }) => [ col, row ]);
}

export function getCircleHexAreaAsStateArray (center, radius) {
  return getHexCircle(normalizeHex(center), radius).map(({ col, row }) => [ col, row ]);
}

export function mergeStateArrays (original, addition) {
  return addition.reduce(addToStateArray, original);
}
