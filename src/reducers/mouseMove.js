import { TOOL_CANVASCONFIG } from '../constants/tools';
import canvasConfigAddDrawOverlay from './tools/canvasConfig/canvasConfigAddDrawOverlay';
import canvasConfigDraw from './tools/canvasConfig/canvasConfigDraw';

function dragEverything (state, newState) {
  const dx = state.mouseData.position.x - state.mouseData.dragStartPosition.x;
  const dy = state.mouseData.position.y - state.mouseData.dragStartPosition.y;

  return {
    ...newState,
    canvasData: {
      ...newState.canvasData,
      viewBoxOffsetX: state.canvasData.viewBoxStartDragOffsetX + dx,
      viewBoxOffsetY: state.canvasData.viewBoxStartDragOffsetY + dy,
    },
  };
}

export default function mouseMove (state, action) {
  if (!action.position) {
    return state;
  }

  let newState = {
    ...state,
    dragBlocked: false,
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
    },
  };

  if (state.mouseData.buttonHeld) {
    if (state.activeTool === TOOL_CANVASCONFIG) {
      newState = canvasConfigDraw(newState, action);
    }

    if (!newState.dragBlocked) {
      newState = dragEverything(state, newState);
    }
  }

  if (state.activeTool === TOOL_CANVASCONFIG) {
    newState = canvasConfigAddDrawOverlay(newState);
  }

  return newState;
}
