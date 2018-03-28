import { TOOL_CANVASCONFIG } from '../constants/tools';
import canvasConfigStartDraw from './tools/canvasConfig/canvasConfigStartDraw';

export default function mouseDown (state, action) {
  if (!action.position) {
    return state;
  }

  let newState = {
    ...state,
    canvasData: {
      ...state.canvasData,
      viewBoxStartDragOffsetX: state.canvasData.viewBoxOffsetX,
      viewBoxStartDragOffsetY: state.canvasData.viewBoxOffsetY,
    },
    mouseData: {
      ...state.mouseData,
      position: {
        ...state.mouseData.position,
        ...action.position,
      },
      svgPosition: {
        ...state.mouseData.svgPosition,
        ...action.svgPosition,
      },
      buttonHeld: true,
      dragStartPosition: {
        ...state.mouseData.position,
        ...action.position,
      },
    },
  };

  if (newState.activeTool === TOOL_CANVASCONFIG) {
    newState = canvasConfigStartDraw(newState, action);
  }

  return newState;
}
