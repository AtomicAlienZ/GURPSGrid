import { pixelsToOddr } from '../../../utils/hexMath';
import {
  addToStateArray,
  removeFromStateArray,
  stateArrayHasHex,
  getRectHexAreaAsStateArray,
  mergeStateArrays,
} from '../../../utils/hexStructures';
import canvasConfigAddDrawOverlay from './canvasConfigAddDrawOverlay';
import { DRAWTYPE_RECTANGLE } from '../../../constants/canvasConfig';

export default function canvasConfigEndDraw (state, action, isClick) {
  if (state.activeToolData.drawType) {
    let newState = {
      ...state,
      activeToolData: {
        ...state.activeToolData,
        drawPrevCol: null,
        drawPrevRow: null,
        startCol: null,
        startRow: null,
      },
    };
    const hex = pixelsToOddr(newState.mouseData.svgPosition);

    if (isClick) {
      let func = stateArrayHasHex(newState.canvasData.activeHexes, hex) ? removeFromStateArray : addToStateArray;
      newState = {
        ...newState,
        canvasData: {
          ...newState.canvasData,
          activeHexes: func(newState.canvasData.activeHexes, hex),
        },
      };
    }
    else {
      newState = canvasConfigAddDrawOverlay(newState, true);

      if (state.activeToolData.drawType === DRAWTYPE_RECTANGLE) {
        const newHexes = getRectHexAreaAsStateArray(
          {col: state.activeToolData.startCol, row: state.activeToolData.startRow},
          hex
        );

        newState = {
          ...newState,
          canvasData: {
            ...newState.canvasData,
            activeHexes: mergeStateArrays(newState.canvasData.activeHexes, newHexes),
          },
        };
      }
    }

    return newState;
  }

  return state;
}
