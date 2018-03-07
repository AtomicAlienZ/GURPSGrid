export default function centerCanvas (state, action) {
  return {
    ...state,
    canvasData: {
      ...state.canvasData,
      viewBoxOffsetX: 0,
      viewBoxOffsetY: 0,
    },
  };
}
