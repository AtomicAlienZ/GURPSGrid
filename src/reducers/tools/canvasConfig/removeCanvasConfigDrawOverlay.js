import { MOUSEOVERLAY_CANVASCONFIGTOOL } from '../../../constants/mouseOverlays';

export default function removeCanvasConfigDrawOverlay (state) {
  return {
    ...state,
    overlays: state.overlays.filter(({ type }) => type !== MOUSEOVERLAY_CANVASCONFIGTOOL),
  };
}
