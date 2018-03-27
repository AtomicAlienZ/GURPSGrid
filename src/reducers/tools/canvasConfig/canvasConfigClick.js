import { pixelsToOddr } from '../../../utils/hexMath';
import { addToStateArray, removeFromStateArray, stateArrayHasHex } from '../../../utils/hexStructures';

export default function canvasConfigClick (state) {
  if (state.activeToolData.drawActive) {
    const hex = pixelsToOddr(state.mouseData.svgPosition);
    let func = stateArrayHasHex(state.canvasData.activeHexes, hex) ? removeFromStateArray : addToStateArray;

    return {
      ...state,
      canvasData: {
        ...state.canvasData,
        activeHexes: func(state.canvasData.activeHexes, hex),
      },
    };
  }

  return state;
}
