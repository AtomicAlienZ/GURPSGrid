// Col ; Row
const activeHexes = [
  // Blob 1 (with holes)
  [1, -2],
  [0, -2],
  [0, 1],
  [1, 0],
  [0, 2],
  [-1, 2],
  [-2, 1],
  [-1, 0],
  [-1, -1],
  [1, -1],
  [2, 0],
  [1, 2],
  [2, 2],
  [2, 1],

  // Blob 2
  [3, -2],
  [4, -2],
  [3, -1],
  [4, -0],
  [5, 0],
  [5, -1],
  [5, -2],
];

const activeHexesMap = activeHexes.reduce(
  (acc, [col, row]) => {
    if (!acc.has(col)) {
      acc.set(col, new Set());
    }

    acc.get(col).add(row);

    return acc;
  },
  new Map()
);

export default {
  objects: [],
  canvasData: {
    // Viewport & position data
    viewBoxOffsetX: 0,
    viewBoxOffsetY: 0,

    viewBoxStartDragOffsetX: 0,
    viewBoxStartDragOffsetY: 0,

    viewPortW: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    viewPortH: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

    activeHexesMap,
  },
  mouseData: {
    position: {
      x: 0,
      y: 0,
    },
    svgPosition: {
      x: 0,
      y: 0,
    },
    buttonHeld: false,
    dragStartPosition: {
      x: 0,
      y: 0,
    },
  },
  toolActive: null,
};
