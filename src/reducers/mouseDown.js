import { TOOLS_DATA_MAP } from '../config/tools';
import { pixelsToOddr } from '../utils/hexMath';

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

  if (state.draw.type) {
    const hex = pixelsToOddr(action.svgPosition);
    newState.draw.startCol = hex.col;
    newState.draw.startRow = hex.row;

    if (
      TOOLS_DATA_MAP[state.activeTool]
      && TOOLS_DATA_MAP[state.activeTool].onDrawStart
    ) {
      newState = TOOLS_DATA_MAP[state.activeTool].onDrawStart(newState, hex);
    }
  }

  return newState;
}
