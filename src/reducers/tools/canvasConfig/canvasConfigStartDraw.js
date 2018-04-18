import { DRAWTYPE_FREEFORM } from '../../../config/drawTypes';
import { addToStateArray, removeFromStateArray } from '../../../utils/hexStructures';

export default function canvasConfigStartDraw (state, hex) {
  if (state.draw.type === DRAWTYPE_FREEFORM) {
    const func = state.draw.exclude ? removeFromStateArray : addToStateArray;
    return {
      ...state,
      activeHexes: func(state.activeHexes, hex),
    };
  }

  return state;
}
