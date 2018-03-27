import { getNeighbourHexCoordinates } from './hexMath';

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

function arrayToMapReducer (acc, item) {
  let col;
  let row;

  if (item instanceof Array) {
    col = item[0];
    row = item[1];
  }
  else {
    col = item.col;
    row = item.row;
  }

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
