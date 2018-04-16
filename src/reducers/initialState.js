import { getCenterPixels } from '../utils/hexStructures';
import getViewPortDimensions from '../utils/getViewPortDimensions';
import { STORAGE_AVAILIABLE, STORAGE_KEY, STORAGE, STORAGE_VERSION } from '../constants/stateStorage';
import { dataUrlToFile } from '../utils/fileUtilities';

let restoredData = {};

if (STORAGE_AVAILIABLE) {
  try {
    const { version, data } = JSON.parse(STORAGE.getItem(STORAGE_KEY));

    if (version === STORAGE_VERSION) {
      restoredData = data;

      // Rehydrating stuff
      if ('textures' in restoredData) {
        restoredData.textures = restoredData.textures
          .map(({ id, name, dataUrl }) => {
            let file = dataUrlToFile(dataUrl, name);
            let preview = URL.createObjectURL(file);
            let size = file.size;
            let type = file.type;

            return {
              id,
              name,
              dataUrl,
              preview,
              size,
              type,
            };
          });
      }
    }
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
