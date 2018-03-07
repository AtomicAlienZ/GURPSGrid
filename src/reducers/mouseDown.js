export default function mouseDown (state, action) {
  if (!action.position) {
    return state;
  }

  const { x, y } = action.position;

  return {
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
        x,
        y,
      },
      buttonHeld: true,
      dragStartPosition: {
        ...state.mouseData.position,
        x,
        y,
      },
    },
  };
}
