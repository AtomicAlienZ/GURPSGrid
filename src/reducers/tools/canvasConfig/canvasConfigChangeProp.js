import { TOOL_CANVASCONFIG } from '../../../constants/tools';
import removeCanvasConfigDrawOverlay from './removeCanvasConfigDrawOverlay';

export default function canvasConfigChangeProp (state, action) {
  if (state.activeTool !== TOOL_CANVASCONFIG) {
    console.warn('Canvas config canvasConfigChangeProp reducer called with wrong tool active:', state.activeTool);
    return state;
  }

  let newState = {
    ...state,
    activeToolData: {
      ...state.activeToolData,
      [action.prop]: action.value,
    },
  };

  if (action.prop === 'drawActive' && !action.value) {
    newState = removeCanvasConfigDrawOverlay(newState);
  }

  return newState;
}
