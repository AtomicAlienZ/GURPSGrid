import getCanvasConfigToolState from './tools/canvasConfig/getCanvasConfigToolState';
import removeCanvasConfigDrawOverlay from './tools/canvasConfig/removeCanvasConfigDrawOverlay';
import { TOOL_CANVASCONFIG } from '../constants/tools';

export default function toolSelect (state, action) {
  let getSubstate = null;

  switch (action.tool) {
    case TOOL_CANVASCONFIG:
      getSubstate = getCanvasConfigToolState;
      break;
  }

  let newState = {
    ...state,
    activeTool: action.tool !== state.activeTool ? action.tool : null,
    activeToolData: getSubstate ? getSubstate(state) : null,
  };

  if (state.activeTool === TOOL_CANVASCONFIG) {
    newState = removeCanvasConfigDrawOverlay(newState);
  }

  return newState;
}
