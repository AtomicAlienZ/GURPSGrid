import { MOUSEOVERLAY_CANVASCONFIGTOOL } from '../../../constants/mouseOverlays';

export function getCanvasConfigDrawOverlay (state, { col, row }) {
  return {
    type: MOUSEOVERLAY_CANVASCONFIGTOOL,
    col,
    row,
  };
}
