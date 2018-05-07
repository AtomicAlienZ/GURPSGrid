import { DRAW_OVERLAYS } from '../../config/mouseOverlays';

export default function drawSetType (state, { drawType: type }) {
  if (type === state.draw.type) {
    return state;
  }

  return {
    ...state,
    draw: {
      ...state.draw,
      type,
    },
    overlays: state.overlays.filter(({ type }) => DRAW_OVERLAYS.indexOf(type) < 0),
  };
}
