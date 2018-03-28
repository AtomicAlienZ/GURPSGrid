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
    ret.startCol = state.activeToolData.startCol;
    ret.startRow = state.activeToolData.startRow;
  }

  return ret;
}
