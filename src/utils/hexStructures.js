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

function arrayToMapReducer (acc, { col, row }) {
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
