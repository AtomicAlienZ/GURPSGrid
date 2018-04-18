import getId from '../../utils/getId';
import { getRadiusByMousePosition } from '../../utils/hexMath';

import {
  DRAW_CIRC,
  DRAW_1HEX,
} from '../../config/mouseOverlays';

export default function getOverlay (overlayType, state, { col, row }, addId = true) {
  const type = overlayType || DRAW_1HEX;

  let ret = {
    type,
    col,
    row,
  };

  if (addId) {
    ret.id = getId();
  }

  if (type !== DRAW_1HEX && state.draw.type !== DRAW_CIRC) {
    ret.toCol = state.draw.startCol;
    ret.toRow = state.draw.startRow;
  }

  if (type === DRAW_CIRC && ret.col !== null && ret.row !== null) {
    const radii = getRadiusByMousePosition(
      { col: state.draw.startCol, row: state.draw.startRow },
      state.mouseData.svgPosition
    );

    ret = {
      ...ret,
      ...radii,
      col: state.draw.startCol,
      row: state.draw.startRow,
    };
  }

  return ret;
}
