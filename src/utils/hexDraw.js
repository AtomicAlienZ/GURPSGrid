import { HEX_SIZE } from '../constants/grid';
import {
  getHexVerticeCoordsByPixels,
  getHexVerticeCoords,
  oddrToPixels,
  getNeighbourHexCoordinates,
  normalizeIndex,
} from './hexMath';
import { hexMapToArray, mapHasHex } from './hexStructures';

/**
 * Returns a path string for SVG <path> that draws a hex
 * @param x Hex center X (pixels)
 * @param y Hex center Y (pixels)
 * @param size Hex size
 * @return {string}
 */
export function getHexPathStringByPixels ({ x, y }, size = HEX_SIZE) {
  let ret = [];

  for (let i = 0; i < 6; i++) {
    const { vertX, vertY} = getHexVerticeCoordsByPixels({ x, y }, i, size);
    ret.push(`${vertX} ${vertY}`);
  }

  return `M ${ret.join(' L ')} Z`;
}

export function getHexPathString (oddrCoords, size = HEX_SIZE) {
  return getHexPathStringByPixels(oddrToPixels(oddrCoords), size);
}

function getHexKey ({ col, row }) {
  return `${col};${row}`;
}

function getTracedPath (areaMap, startHex, startVertex, renderedMap, size = HEX_SIZE) {
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

      // Remembering rendered
      if (!map.has(currentHexKey)) {
        map.set(currentHexKey, new Set());
      }

      map.get(currentHexKey).add(normalizedTracer);

      const { vertX, vertY } = getHexVerticeCoords(currentHex, normalizedDirection, size);

      path.push('L', vertX, vertY );
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
            !mapHasHex(areaMap, getNeighbourHexCoordinates(hex, vertex + 1))
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

export function getAreaOutlinePath (areaMap, size = HEX_SIZE) {
  const areaArr = hexMapToArray(areaMap);
  let map = new Map();
  let path = [];
  let edgeStart = getUntracedPathEdge(areaMap, areaArr, map);

  while (edgeStart) {
    let pathData = getTracedPath(areaMap, edgeStart.hex, edgeStart.vertex, map, size);
    path.push(...pathData.path);
    map = pathData.map;
    edgeStart = getUntracedPathEdge(areaMap, areaArr, map);
  }

  return path.join(' ');
}

export function getAreaInnerPath (areaMap, size = HEX_SIZE) {
  return hexMapToArray(areaMap)
    .map((hex) => {
      let path = [];

      for (let vertex = 0; vertex < 3; vertex++) {
        if (mapHasHex(areaMap, getNeighbourHexCoordinates(hex, vertex + 1))) {
          const { vertX, vertY } = getHexVerticeCoords(hex, vertex + 1, size);

          if (!path.length || (path[path.length - 2] !== vertX && path[path.length - 1] !== vertY)) {
            const { vertX, vertY } = getHexVerticeCoords(hex, vertex, size);
            path.push('M', vertX, vertY);
          }

          path.push('L', vertX, vertY);
        }
      }

      return path.join(' ');
    })
    .join(' ');
}
