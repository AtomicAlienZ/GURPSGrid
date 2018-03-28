import { pixelsToOddr } from '../../../utils/hexMath';
import { CANVASCONFIGTOOL_TYPES, CANVASCONFIGTOOL_CIRCLE } from '../../../constants/mouseOverlays';
import getCanvasConfigDrawOverlay from './getCanvasConfigDrawOverlay';

export default function canvasConfigAddDrawOverlay (state, forceChange = false) {
  if (state.activeToolData.drawType) {
    let overlays = state.overlays;
    let existing = overlays.find(({ type }) => CANVASCONFIGTOOL_TYPES.indexOf(type) >= 0);
    let hex = pixelsToOddr(state.mouseData.svgPosition);
    let actualChange = false;

    if (existing) {
      let force = forceChange || existing.type === CANVASCONFIGTOOL_CIRCLE;

      if (existing.col !== hex.col || existing.row !== hex.row || force) {
        overlays = overlays.map((overlay) => {
          if (CANVASCONFIGTOOL_TYPES.indexOf(overlay.type) >= 0) {
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
