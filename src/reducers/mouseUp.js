export default function mouseDown (state, action) {
  if (!action.position) {
    return state;
  }

  const { x, y } = action.position;

  return {
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
        ...state.mouseData.position,
        x: 0,
        y: 0,
      },
    },
  };
}
