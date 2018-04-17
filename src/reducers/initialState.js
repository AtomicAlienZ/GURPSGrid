import { getCenterPixels } from '../utils/hexStructures';
import getViewPortDimensions from '../utils/getViewPortDimensions';
import { STORAGE_AVAILIABLE, STORAGE_KEY, STORAGE } from '../constants/stateStorage';
import { rehydrateState } from '../utils/stateStorageUtilities';

let restoredData = {};

if (STORAGE_AVAILIABLE) {
  try {
    restoredData = rehydrateState(STORAGE.getItem(STORAGE_KEY));
  }
  catch (e) { /* do nothing */ }
}

const { x, y } = getCenterPixels(restoredData.activeHexes || []);
const { width: viewPortW, height: viewPortH } = getViewPortDimensions();

export default {
  // These things should be persistent/saved to a file
  objects: [],
  activeHexes: [],
  floorAreas: [],
  textures: [],

  ...restoredData,

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

  storageSaveError: null,
};
