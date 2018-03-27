import { pixelsToOddr } from '../../../utils/hexMath';
import { MOUSEOVERLAY_CANVASCONFIGTOOL } from '../../../constants/mouseOverlays';
import { getCanvasConfigDrawOverlay } from './getCanvasConfigDrawOverlay';

export default function canvasConfigAddDrawOverlay (state) {
  if (state.activeToolData.drawActive) {
    let overlays = state.overlays;
    let existing = overlays.find(({ type }) => type === MOUSEOVERLAY_CANVASCONFIGTOOL);
    let hex = pixelsToOddr(state.mouseData.svgPosition);
    let actualChange = false;

    if (existing) {
      if (existing.col !== hex.col || existing.row !== hex.row) {
        overlays = overlays.map((overlay) => {
          if (
            overlay.type === MOUSEOVERLAY_CANVASCONFIGTOOL
            && (overlay.col !== hex.col || overlay.row !== hex.row)
          ) {
            actualChange = true;
            return getCanvasConfigDrawOverlay(state, hex);
          }

          return overlay;
        });
      }
    }
    else {
      actualChange = true;
      overlays = [
        ...overlays,
        getCanvasConfigDrawOverlay(state, hex),
      ];
    }

    if (actualChange) {
      return {
        ...state,
        overlays,
      };
    }
  }

  return state;
}
