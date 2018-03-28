import { getRadiusByMousePosition } from '../../../utils/hexMath';

import {
  CANVASCONFIGTOOL_FREEFORM,
  CANVASCONFIGTOOL_CIRCLE,
  CANVASCONFIGTOOL_LINE,
  CANVASCONFIGTOOL_RECT,
} from '../../../constants/mouseOverlays';

import {
  DRAWTYPE_FREEFORM,
  DRAWTYPE_CIRCLE,
  DRAWTYPE_LINE,
  DRAWTYPE_RECTANGLE,
} from '../../../constants/canvasConfig';

const TYPES_MAP = {
  [DRAWTYPE_FREEFORM]: CANVASCONFIGTOOL_FREEFORM,
  [DRAWTYPE_CIRCLE]: CANVASCONFIGTOOL_CIRCLE,
  [DRAWTYPE_LINE]: CANVASCONFIGTOOL_LINE,
  [DRAWTYPE_RECTANGLE]: CANVASCONFIGTOOL_RECT,
};

export default function getCanvasConfigDrawOverlay (state, { col, row }) {
  const type = TYPES_MAP[state.activeToolData.drawType] || CANVASCONFIGTOOL_FREEFORM;

  let ret = {
    type,
    col,
    row,
  };

  if (type !== CANVASCONFIGTOOL_FREEFORM) {
    ret.toCol = state.activeToolData.startCol;
    ret.toRow = state.activeToolData.startRow;

    if (type === CANVASCONFIGTOOL_CIRCLE && ret.toCol !== null && ret.toRow !== null) {
      const center = { col: ret.toCol, row: ret.toRow };
      const radii = getRadiusByMousePosition(center, state.mouseData.svgPosition);

      ret = {
        ...ret,
        ...center,
        ...radii,
      };
    }
  }

  return ret;
}
