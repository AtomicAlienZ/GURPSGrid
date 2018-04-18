import addOverlay from './draw/addOverlay';
import { MOUSE_CLICK_TOLERANCE } from '../config/general';
import { TOOLS_DATA_MAP } from '../config/tools';
import { DRAWTYPE_CIRCLE, DRAWTYPE_LINE, DRAWTYPE_RECTANGLE } from '../config/drawTypes';
import { DRAW_1HEX } from '../config/mouseOverlays';
import {
  pixelsToOddr,
  getRadiusByMousePosition,
} from '../utils/hexMath';
import {
  getRectHexAreaAsStateArray,
  getLineHexAreaAsStateArray,
  getCircleHexAreaAsStateArray,
} from '../utils/hexStructures';

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
  const isClick = mouseMovedDistance <= MOUSE_CLICK_TOLERANCE;

  if (state.draw.type) {
    const hex = pixelsToOddr(newState.mouseData.svgPosition);
    let newHexes = [];

    newState.draw = {
      ...newState.draw,
      prevCol: null,
      prevRow: null,
      startCol: null,
      startRow: null,
    };

    if (
      TOOLS_DATA_MAP[state.activeTool]
      && TOOLS_DATA_MAP[state.activeTool].onDrawEnd
    ) {
      let start = { col: state.draw.startCol, row: state.draw.startRow };
      const { radius } = getRadiusByMousePosition(start, state.mouseData.svgPosition);

      switch (state.draw.type) {
        case DRAWTYPE_RECTANGLE:
          newHexes = getRectHexAreaAsStateArray(start, hex);
          break;
        case DRAWTYPE_LINE:
          newHexes = getLineHexAreaAsStateArray(start, hex);
          break;
        case DRAWTYPE_CIRCLE:
          newHexes = getCircleHexAreaAsStateArray(start, radius);
          break;
      }

      newState = TOOLS_DATA_MAP[state.activeTool].onDrawEnd(newState, newHexes, isClick);
    }

    // Processing overlays
    newState = addOverlay(newState, DRAW_1HEX);
  }

  return newState;
}
