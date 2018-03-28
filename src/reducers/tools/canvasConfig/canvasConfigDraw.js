import { pixelsToOddr } from '../../../utils/hexMath';
import { addToStateArray } from '../../../utils/hexStructures';
import { DRAWTYPE_FREEFORM } from '../../../constants/canvasConfig';

export default function canvasConfigDraw (state) {
  if (state.activeToolData.drawType) {
    const hex = pixelsToOddr(state.mouseData.svgPosition);
    let newState = {
      ...state,
      dragBlocked: true,
    };

    // Freeform draw
    if (
      state.activeToolData.drawType === DRAWTYPE_FREEFORM
      && (
        hex.col !== state.activeToolData.drawPrevCol
        || hex.row !== state.activeToolData.drawPrevRow
      )
    ) {
      // Adding hexes
      state.canvasData.activeHexes = addToStateArray(state.canvasData.activeHexes, hex);

      newState.activeToolData = {
        ...state.activeToolData,
        drawPrevCol: hex.col,
        drawPrevRow: hex.row,
      };
    }

    return newState;
  }

  return state;
}
