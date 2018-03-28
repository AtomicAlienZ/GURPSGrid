import { DRAWTYPE_FREEFORM } from '../../../constants/canvasConfig';
import { pixelsToOddr } from '../../../utils/hexMath';

export default function canvasConfigStartDraw (state, action) {
  if (state.activeToolData.drawType && state.activeToolData.drawType !== DRAWTYPE_FREEFORM) {
    const { col: startCol, row: startRow } = pixelsToOddr(action.svgPosition);

    return {
      ...state,
      activeToolData: {
        ...state.activeToolData,
        startCol,
        startRow,
      },
    };
  }

  return state;
}
