import getCoordBoundaries from '../utils/getCoordBoundaries';
import { DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT } from '../constants/grid';

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

    // Grid data
    grid: {
      width: DEFAULT_GRID_WIDTH,
      height: DEFAULT_GRID_HEIGHT,
      ...getCoordBoundaries(DEFAULT_GRID_WIDTH, DEFAULT_GRID_HEIGHT),
    },
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
