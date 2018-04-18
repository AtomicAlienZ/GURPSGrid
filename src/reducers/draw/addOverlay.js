import { pixelsToOddr } from '../../utils/hexMath';
import getOverlay from './getOverlay';
import {
  DRAW_OVERLAYS,
} from '../../config/mouseOverlays';

export default function addOverlay (state, type) {
  let { overlays } = state;
  let { id } = overlays.find(({ type }) => DRAW_OVERLAYS.indexOf(type) >= 0) || {};
  let hex = pixelsToOddr(state.mouseData.svgPosition);

  if (id) {
    overlays = overlays.map((overlay) => {
      if (overlay.id === id) {
        return { ...overlay, ...getOverlay(type, state, hex, false) };
      }

      return overlay;
    });
  }
  else {
    overlays = [
      ...overlays,
      getOverlay(type, state, hex),
    ];
  }

  return {
    ...state,
    overlays,
  };
}
