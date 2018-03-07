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

  let ret = {
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
      },
    },
  };

  if (state.mouseData.buttonHeld) {
    ret = dragEverything(state, ret);
  }

  return ret;
}
