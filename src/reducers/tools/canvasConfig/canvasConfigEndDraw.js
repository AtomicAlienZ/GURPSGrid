import {
  pixelsToOddr,
  getRadiusByMousePosition,
} from '../../../utils/hexMath';
import {
  getRectHexAreaAsStateArray,
  getLineHexAreaAsStateArray,
  mergeStateArrays,
  substractStateArrays,
  getCircleHexAreaAsStateArray,
} from '../../../utils/hexStructures';
import canvasConfigAddDrawOverlay from './canvasConfigAddDrawOverlay';
import { DRAWTYPE_RECTANGLE, DRAWTYPE_LINE, DRAWTYPE_CIRCLE } from '../../../constants/canvasConfig';

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
    let newHexes = [];

    newState = canvasConfigAddDrawOverlay(newState, true);

    if (state.activeToolData.drawType === DRAWTYPE_RECTANGLE) {
      newHexes = getRectHexAreaAsStateArray(
        {col: state.activeToolData.startCol, row: state.activeToolData.startRow},
        hex
      );
    }
    else if (state.activeToolData.drawType === DRAWTYPE_LINE) {
      newHexes = getLineHexAreaAsStateArray(
        {col: state.activeToolData.startCol, row: state.activeToolData.startRow},
        hex
      );
    }
    else if (state.activeToolData.drawType === DRAWTYPE_CIRCLE) {
      const center = {col: state.activeToolData.startCol, row: state.activeToolData.startRow};
      const { radius } = getRadiusByMousePosition(center, state.mouseData.svgPosition);
      newHexes = getCircleHexAreaAsStateArray(center, radius);
    }

    const func = state.activeToolData.drawExclude ? substractStateArrays : mergeStateArrays;

    newState = {
      ...newState,
      canvasData: {
        ...newState.canvasData,
        activeHexes: func(newState.canvasData.activeHexes, newHexes),
      },
    };

    return newState;
  }

  return state;
}
