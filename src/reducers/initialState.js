import { getCenterPixels } from '../utils/hexStructures';

// Col ; Row
const activeHexes = [
  // Blob 1 (with holes)
  // These 2 bug out for some reason if left alone
  [-1, -1],
  [0, -2],

  // [1, -2],
  // [0, 1],
  // [1, 0],
  // [0, 2],
  // [-1, 2],
  // [-2, 1],
  // [-1, 0],
  // [1, -1],
  // [2, 0],
  // [1, 2],
  // [2, 2],
  // [2, 1],

  // Blob 2
  // [3, -2],
  // [4, -2],
  // [3, -1],
  // [4, -0],
  // [5, 0],
  // [5, -1],
  // [5, -2],
  // [6, -1],
  // [7, -1],
  // [8, -1],
  // [9, -1],
];

const { x, y } = getCenterPixels(activeHexes);

export default {
  objects: [],
  overlays: [],
  canvasData: {
    // Viewport & position data
    viewBoxOffsetX: -x,
    viewBoxOffsetY: -y,

    viewBoxStartDragOffsetX: 0,
    viewBoxStartDragOffsetY: 0,

    viewPortW: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    viewPortH: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),

    activeHexes,
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

  activeTool: null,
  activeToolData: null,
};
