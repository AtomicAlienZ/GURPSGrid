import { MOUSE_CLICK_TOLERANCE } from '../constants/general';
import { TOOL_CANVASCONFIG } from '../constants/tools';

import canvasConfigClick from './tools/canvasConfig/canvasConfigClick';

export default function mouseDown (state, action) {
  if (!action.position) {
    return state;
  }

  const { x, y } = action.position;
  const { x: dragStartX, y: dragStartY } = state.mouseData.dragStartPosition;

  let newState = {
    ...state,
    canvasData: {
      ...state.canvasData,
      viewBoxStartDragOffsetX: 0,
      viewBoxStartDragOffsetY: 0,
    },
    mouseData: {
      ...state.mouseData,
      position: {
        ...state.mouseData.position,
        x,
        y,
      },
      buttonHeld: false,
      dragStartPosition: {
        ...state.mouseData.dragStartPosition,
        x: 0,
        y: 0,
      },
    },
  };

  const mouseMovedDistance = Math.sqrt((x - dragStartX) ** 2 + (y - dragStartY) ** 2);

  // We process "click" event iff mouse has moved not more than MOUSE_CLICK_TOLERANCE pixels
  // between mousedown and mouseup events
  if (mouseMovedDistance <= MOUSE_CLICK_TOLERANCE) {
    if (state.activeTool === TOOL_CANVASCONFIG) {
      newState = canvasConfigClick(newState, action);
    }
  }

  return newState;
}
