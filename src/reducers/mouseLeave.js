import { DRAW_OVERLAYS } from '../config/mouseOverlays';

export default function mouseLeave (state, action) {
  if (action.position && state.draw.type) {
    const overlays = state.overlays.filter(({ type }) => DRAW_OVERLAYS.indexOf(type) < 0);

    if (overlays.length !== state.overlays.length) {
      return {
        ...state,
        overlays,
      };
    }
  }

  return state;
}
