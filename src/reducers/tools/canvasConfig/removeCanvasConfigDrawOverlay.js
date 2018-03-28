import { CANVASCONFIGTOOL_TYPES } from '../../../constants/mouseOverlays';

export default function removeCanvasConfigDrawOverlay (state) {
  return {
    ...state,
    overlays: state.overlays.filter(({ type }) => CANVASCONFIGTOOL_TYPES.indexOf(type) < 0),
  };
}
