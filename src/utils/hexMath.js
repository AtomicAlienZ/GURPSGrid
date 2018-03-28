/**
 * Common hex math here
 *
 * Source: https://www.redblobgames.com/grids/hexagons/
 * Note: “odd-r” horizontal layout coordinate grid is used
 */

import { HEX_SIZE, HEX_WIDTH } from '../constants/grid';

export function roundToDecimals (num, decimals = 4) {
  const powTen = 10 ** decimals;
  return Math.round(num * powTen) / powTen;
}

export function isEven (number) {
  // Bitwise here to determine evenness of `number`. Better then modulo (%) op because works with negative numbers
  return (number & 1) === 0; // eslint-disable-line no-bitwise
}

/**
 * Converts "cubic" hex coordinates to "oddr-offset" coordinates
 *
 * @param x
 * @param z
 * @return {{col: number, row: number}}
 */
export function cubeToOddr ({ x, /*y,*/ z }) {
  return {
    // Bitwise here to determine evenness of `z`. Better then modulo (%) op because works with negative numbers
    col: x + ((z - (z & 1)) / 2), // eslint-disable-line no-bitwise
    row: z,
  };
}

/**
 * Converts "oddr-offset" hex coordinates to "cubic" coordinates
 * @param row
 * @param col
 * @return {{x: number, y: number, z: number}}
 */
export function oddrToCube({ col, row }) {
  // Bitwise here to determine evenness of `row`. Better then modulo (%) op because works with negative numbers
  const x = col - ((row - (row & 1)) / 2); // eslint-disable-line no-bitwise
  const z = row;
  const y = -x - z;
  return { x, y, z };
}

/**
 * Converts "oddr-offset" hex coordinates to pixel coordinates
 * @param row
 * @param col
 * @return {{x: number, y: number}}
 */
export function oddrToPixels ({ row, col }) {
  return {
    // Bitwise here to determine evenness of `col`. Better then modulo (%) op because works with negative numbers
    x: roundToDecimals(HEX_SIZE * Math.sqrt(3) * (col + 0.5 * (row & 1))), // eslint-disable-line no-bitwise
    y: roundToDecimals(HEX_SIZE * 3/2 * row),
  };
}

/**
 * Returns oddr coordinates by given pixel coordinates
 *
 * Based on https://web.archive.org/web/20161024224848/http://gdreflections.com/2011/02/hexagonal-grid-math.html
 *
 * @param x
 * @param y
 * @return {{col: number, row: number}}
 */
export function pixelsToOddr ({ x, y }) {
  let col = 0;
  let row = 0;

  // Offsetting x & y
  const oX = x + HEX_WIDTH / 2;
  const oY = y + HEX_SIZE / 2;

  // Additional tile info
  const tileW = HEX_WIDTH;
  const tileH = HEX_SIZE * 1.5;

  // Tile coordinates
  const tileRow = Math.floor(oY / tileH);
  const tileColShift = oX - (isEven(tileRow) ? 0 : 1) * (HEX_WIDTH / 2);
  const tileCol = Math.floor(tileColShift / HEX_WIDTH);

  // Point coordinates relative to tile
  const tileRelativeX = tileColShift - tileCol * HEX_WIDTH;
  const tileRelativeY = oY - tileRow * tileH;

  // Function value at tileRelativeX
  const functionValue = tileH - HEX_SIZE * Math.abs(0.5 - (tileRelativeX / HEX_WIDTH));

  // Tile-relative point is in main tile part (above line)
  if (tileRelativeY < functionValue) {
    col = tileCol;
    row = tileRow;
  }
  // Either left-below or right-below line
  else {
    // = tileCol - [left-below or right-below] + [odd-row-shift]
    col = tileCol - (tileRelativeX < tileW / 2 ? 1 : 0) + (!isEven(tileRow) ? 1 : 0);
    row = tileRow + 1;
  }

  return {
    col,
    row,
  };
}

/**
 * Returns an object with i-th hex vertex coordinates
 * @param x Hex center X (pixels)
 * @param y Hex center Y (pixels)
 * @param i Vertice index
 * @param size Hex size
 * @return {{vertX: *, vertY: *}}
 */
export function getHexVerticeCoordsByPixels ({ x, y }, i, size = HEX_SIZE) {
  const angleDeg = (60 * i) + 30;
  const angleRad = (Math.PI / 180) * angleDeg;
  return {
    vertX: roundToDecimals(x + size * Math.cos(angleRad)),
    vertY: roundToDecimals(y + size * Math.sin(angleRad)),
  };
}

export function getHexVerticeCoords (oddrCoords, i, size = HEX_SIZE) {
  return getHexVerticeCoordsByPixels(oddrToPixels(oddrCoords), i, size);
}

export function normalizeIndex (index) {
  const mod = index % 6;
  return Math.abs(mod >= 0 ? mod : 6 + mod);
}

const oddrDirectionOffsets = [
  [[+1,  0], [0, +1], [-1, +1], [-1,  0], [-1, -1], [0, -1]],
  [[+1,  0], [+1, +1], [0, +1], [-1,  0], [0, -1], [+1, -1]],
];

export function getNeighbourHexCoordinates ({ col, row }, direction) {
  const normalizedDirection = normalizeIndex(direction);
  // Looking up shifts for even/odd rows for given direction
  // Bitwise to determine evenness
  const [shiftCol, shiftRow] = oddrDirectionOffsets[row & 1][normalizedDirection]; // eslint-disable-line no-bitwise
  return { col: col + shiftCol, row: row + shiftRow };
}

export function getDistance (from, to) {
  const a = oddrToCube(from);
  const b = oddrToCube(to);
  return Math.max(Math.abs(a.x - b.x), Math.abs(a.y - b.y), Math.abs(a.z - b.z));
}

// for floats
function lerp(a, b, t) {
  return a + (b - a) * t;
}

// for hexes
function cubeLerp(a, b, t) {
  return {
    x: lerp(a.x, b.x, t),
    y: lerp(a.y, b.y, t),
    z: lerp(a.z, b.z, t),
  };
}

function cubeRound(cube) {
  let x = Math.round(cube.x);
  let y = Math.round(cube.y);
  let z = Math.round(cube.z);

  let xDiff = Math.abs(x - cube.x);
  let yDiff = Math.abs(y - cube.y);
  let zDiff = Math.abs(z - cube.z);

  if (xDiff > yDiff && xDiff > zDiff) {
    x = -y -z;
  }
  else if (yDiff > zDiff) {
    y = -x -z;
  }
  else {
    z = -x -y;
  }

  return { x, y, z };
}

export function getHexLine (from, to) {
  const cubeFrom = oddrToCube(from);
  const cubeTo = oddrToCube(to);
  let iters = getDistance(from, to);
  let results = [];
  let adder = iters ? 1/iters : 1;

  for (let i = 0; i <= iters; i++) {
    results.push(cubeToOddr(cubeRound(cubeLerp(cubeFrom, cubeTo, adder * i))));
  }

  return results;
}
