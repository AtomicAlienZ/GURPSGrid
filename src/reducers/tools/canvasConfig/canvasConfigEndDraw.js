import {
  mergeStateArrays,
  substractStateArrays,
} from '../../../utils/hexStructures';

export default function canvasConfigEndDraw (state, newHexes) {
  const func = state.draw.exclude ? substractStateArrays : mergeStateArrays;
  return {
    ...state,
    activeHexes: func(state.activeHexes, newHexes),
  };
}
