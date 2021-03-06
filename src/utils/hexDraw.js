import {
  getHexVerticeCoords,
  getNeighbourHexCoordinates,
  normalizeIndex,
} from './hexMath';
import { hexMapToArray, mapHasHex, mapHasNeighbourHex, getCoordBoundaries } from './hexStructures';

function getHexKey ({ col, row }) {
  return `${col};${row}`;
}

function getTracedPath (areaMap, startHex, startVertex, renderedMap) {
  let currentHex = startHex;
  let currentVertex = startVertex;
  let currentHexKey = getHexKey(currentHex);
  let path = [];
  let map = new Map(renderedMap);

  // Tracing edge while we have a current Hex and we haven't drawn current side
  while (
    currentHex
    && !(map.has(currentHexKey) && map.get(currentHexKey).has(currentVertex))
  ) {
    // Determining end vertex & first neighbour hex
    let neighbourHex = null;
    let switchHexDirection = currentVertex + 6;
    for (let tracer = currentVertex; tracer < currentVertex + 6; tracer++) {
      const neighbourHexCandidate = getNeighbourHexCoordinates(currentHex, tracer + 1);

      if (!neighbourHex && mapHasHex(areaMap, neighbourHexCandidate)) {
        neighbourHex = neighbourHexCandidate;
        switchHexDirection = tracer;
      }
    }

    // Drawing
    for (let tracer = currentVertex; tracer < switchHexDirection; tracer++) {
      const normalizedTracer = normalizeIndex(tracer);
      const normalizedDirection = normalizeIndex(tracer + 1);

      //
      if (!(map.has(currentHexKey) && map.get(currentHexKey).has(normalizedTracer))) {
        // Remembering rendered
        if (!map.has(currentHexKey)) {
          map.set(currentHexKey, new Set());
        }

        map.get(currentHexKey).add(normalizedTracer);

        const { vertX, vertY } = getHexVerticeCoords(currentHex, normalizedDirection);

        path.push('L', vertX, vertY );
      }
    }

    currentHex = neighbourHex;

    if (currentHex) {
      currentVertex = normalizeIndex(switchHexDirection - 2);
      currentHexKey = getHexKey(currentHex);
    }
  }

  path[0] = 'M';
  path.push('Z');

  return { path, map };
}

function getUntracedPathEdge (areaMap, areaArr, renderedMap) {
  return areaArr.reduce(
    (acc, hex) => {
      if (!acc) {
        for (let vertex = 0; vertex < 6; vertex++) {
          const key = getHexKey(hex);

          if (
            !mapHasNeighbourHex(areaMap, hex, vertex + 1)
            && (!renderedMap.has(key) || !renderedMap.get(key).has(vertex))
          ) {
            return { hex, vertex };
          }
        }
      }

      return acc;
    },
    null
  );
}

export function getAreaOutlinePath (areaMap) {
  const areaArr = hexMapToArray(areaMap);
  let map = new Map();
  let path = [];
  let edgeStart = getUntracedPathEdge(areaMap, areaArr, map);

  while (edgeStart) {
    let pathData = getTracedPath(areaMap, edgeStart.hex, edgeStart.vertex, map);
    path.push(...pathData.path);
    map = pathData.map;
    edgeStart = getUntracedPathEdge(areaMap, areaArr, map);
  }

  return path.join(' ');
}

export function getAreaInnerPath (areaMap) {
  return hexMapToArray(areaMap)
    .map((hex) => {
      let path = [];

      for (let vertex = 0; vertex < 3; vertex++) {
        if (mapHasNeighbourHex(areaMap, hex, vertex + 1)) {
          const { vertX, vertY } = getHexVerticeCoords(hex, vertex + 1);

          if (!path.length || (path[path.length - 2] !== vertX && path[path.length - 1] !== vertY)) {
            const { vertX, vertY } = getHexVerticeCoords(hex, vertex);
            path.push('M', vertX, vertY);
          }

          path.push('L', vertX, vertY);
        }
      }

      return path.join(' ');
    })
    .join(' ');
}

export function getRectOutlinePath (from, to) {
  let path = [];
  const { minCol, maxCol, minRow, maxRow } = getCoordBoundaries([from, to]);

  // Top boundary
  for (let col = minCol; col <= maxCol; col++) {
    for (let i = 3; i <= 4; i++) {
      let vert = getHexVerticeCoords({ row: minRow, col }, i);
      path.push(col === minCol && i === 3 ? 'M' : 'L', vert.vertX, vert.vertY);
    }
  }

  // Right boundary
  for (let row = minRow; row <= maxRow; row++) {
    for (let i = -1; i <= 0; i++) {
      let vert = getHexVerticeCoords({ row, col: maxCol }, i);
      path.push('L', vert.vertX, vert.vertY);
    }
  }

  // Bottom boundary
  for (let col = maxCol; col >= minCol; col--) {
    for (let i = 0; i <= 1; i++) {
      let vert = getHexVerticeCoords({ row: maxRow, col }, i);
      path.push(col === minRow && i === 3 ? 'M' : 'L', vert.vertX, vert.vertY);
    }
  }

  let vert = getHexVerticeCoords({ row: maxRow, col: minCol }, 2);
  path.push('L', vert.vertX, vert.vertY);

  // Left boundary
  for (let row = maxRow; row >= minRow; row--) {
    for (let i = 2; i <= 3; i++) {
      let vert = getHexVerticeCoords({ row, col: minCol }, i);
      path.push('L', vert.vertX, vert.vertY);
    }
  }

  path.push('Z');

  return path.join(' ');
}
