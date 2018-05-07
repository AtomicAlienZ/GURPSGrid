// import removeCanvasConfigDrawOverlay from './tools/canvasConfig/removeCanvasConfigDrawOverlay';
import { TOOLS_DATA_MAP } from '../config/tools';

export default function toolSelect (state, action) {
  const activeTool = action.tool !== state.activeTool ? action.tool : null;

  let newState = {
    ...state,
    overlays: [],
    draw: {
      ...state.draw,
      type: null,
    },
  };

  if (TOOLS_DATA_MAP[state.activeTool] && TOOLS_DATA_MAP[state.activeTool].onInactive) {
    newState = TOOLS_DATA_MAP[state.activeTool].onInactive(newState);
  }

  newState.activeTool = activeTool;

  if (TOOLS_DATA_MAP[activeTool] && TOOLS_DATA_MAP[activeTool].onActive) {
    newState = TOOLS_DATA_MAP[activeTool].onActive(newState);
  }

  return newState;
}
