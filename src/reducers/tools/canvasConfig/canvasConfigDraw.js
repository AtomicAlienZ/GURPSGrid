import { addToStateArray, removeFromStateArray } from '../../../utils/hexStructures';
import { DRAWTYPE_FREEFORM } from '../../../config/drawTypes';

export default function canvasConfigDraw (state, hex) {
  if (state.draw.type === DRAWTYPE_FREEFORM) {
    const func = state.draw.exclude ? removeFromStateArray : addToStateArray;
    return {
      ...state,
      activeHexes: func(state.activeHexes, hex),
    };
  }

  return state;
}
