import { getCenterPixels } from '../utils/hexStructures';

export default function canvasCenter (state) {
  const { x, y } = getCenterPixels(state.activeHexes);

  return {
    ...state,
    canvasData: {
      ...state.canvasData,
      viewBoxOffsetX: -x,
      viewBoxOffsetY: -y,
    },
  };
}
