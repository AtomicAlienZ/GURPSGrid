import addOverlay from './draw/addOverlay';
import { TOOLS_DATA_MAP } from '../config/tools';
import { pixelsToOddr } from '../utils/hexMath';
import {
  DRAW_RECT,
  DRAW_LINE,
  DRAW_CIRC,
  DRAW_1HEX,
} from '../config/mouseOverlays';
import {
  DRAWTYPE_FREEFORM,
  DRAWTYPE_RECTANGLE,
  DRAWTYPE_LINE,
  DRAWTYPE_CIRCLE,
} from '../config/drawTypes';

const DRAW_OVERLAY_TYPEMAP = {
  [DRAWTYPE_FREEFORM]: DRAW_1HEX,
  [DRAWTYPE_RECTANGLE]: DRAW_RECT,
  [DRAWTYPE_LINE]: DRAW_LINE,
  [DRAWTYPE_CIRCLE]: DRAW_CIRC,
};

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
    mouseData: {
      ...state.mouseData,
      position: {
        ...state.mouseData.position,
        ...action.position,
      },
      svgPosition: {
        ...state.mouseData.svgPosition,
        ...action.svgPosition,
        prevX: state.mouseData.svgPosition.x,
        prevY: state.mouseData.svgPosition.y,
      },
    },
  };

  const hex = pixelsToOddr(newState.mouseData.svgPosition);

  if (state.mouseData.buttonHeld) {
    if (!newState.draw.type) {
      newState = dragEverything(state, newState);
    }
    else {
      if (hex.col !== state.draw.prevCol || hex.row !== state.draw.prevRow) {
        newState.draw.prevCol = hex.col;
        newState.draw.prevRow = hex.row;
      }

      if (
        TOOLS_DATA_MAP[state.activeTool]
        && TOOLS_DATA_MAP[state.activeTool].onDraw
      ) {
        newState = TOOLS_DATA_MAP[state.activeTool].onDraw(newState, hex);
      }
    }
  }

  if (newState.draw.type) {
    const type = state.mouseData.buttonHeld ? DRAW_OVERLAY_TYPEMAP[newState.draw.type] || DRAW_1HEX : DRAW_1HEX;
    const prevHex = pixelsToOddr({ x: state.mouseData.svgPosition.x, y: state.mouseData.svgPosition.y });

    if (newState.draw.type === DRAWTYPE_CIRCLE || hex.col !== prevHex.col || hex.row !== prevHex.row) {
      newState = addOverlay(newState, type);
      // console.log(newState.overlays[0]);
    }
  }

  if (
    TOOLS_DATA_MAP[state.activeTool]
    && TOOLS_DATA_MAP[state.activeTool].onMouseMove
  ) {
    newState = TOOLS_DATA_MAP[state.activeTool].onMouseMove(newState, hex);
  }

  return newState;
}
