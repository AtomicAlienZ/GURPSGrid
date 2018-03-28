import { DRAWTYPE_FREEFORM } from '../../../constants/canvasConfig';
import { pixelsToOddr } from '../../../utils/hexMath';
import { addToStateArray, removeFromStateArray } from '../../../utils/hexStructures';

export default function canvasConfigStartDraw (state, action) {
  if (state.activeToolData.drawType) {
    const { col: startCol, row: startRow } = pixelsToOddr(action.svgPosition);

    let newState = {
      ...state,
      activeToolData: {
        ...state.activeToolData,
        startCol,
        startRow,
      },
    };

    if (state.activeToolData.drawType === DRAWTYPE_FREEFORM) {
      const func = state.activeToolData.drawExclude ? removeFromStateArray : addToStateArray;
      newState = {
        ...newState,
        canvasData: {
          ...newState.canvasData,
          activeHexes: func(newState.canvasData.activeHexes, pixelsToOddr(newState.mouseData.svgPosition)),
        },
      };
    }

    return newState;
  }

  return state;
}
