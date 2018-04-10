import { getCenterPixels } from '../utils/hexStructures';
import getViewPortDimensions from '../utils/getViewPortDimensions';

// Col ; Row
const activeHexes = [
  // Blob 1 (with holes)
  [-1, -1],
  [0, -2],

  [1, -2],
  [0, 1],
  [1, 0],
  [0, 2],
  [-1, 2],
  [-2, 1],
  [-1, 0],
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
  [6, -1],
  [7, -1],
  [8, -1],
  [9, -1],
];

// const activeHexes = [];
// const siz = 27;
// for (let col = -siz; col <= siz; col++) {
//   for (let row = -siz; row <= siz; row++) {
//     activeHexes.push([col, row]);
//   }
// }

const { x, y } = getCenterPixels(activeHexes);
const { width: viewPortW, height: viewPortH } = getViewPortDimensions();

export default {
  // These things should be persistent/saved to a file
  objects: [],
  activeHexes,
  floorAreas: [],
  textures: [],

  // Runtime stuff. Not needed to be persistent
  overlays: [],
  canvasData: {
    // Viewport & position data
    viewBoxOffsetX: -x,
    viewBoxOffsetY: -y,

    viewBoxStartDragOffsetX: 0,
    viewBoxStartDragOffsetY: 0,

    viewPortW,
    viewPortH,
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

  dragBlocked: false,

  activeTool: null,
  activeToolData: null,
};
