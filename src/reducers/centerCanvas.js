export default function centerCanvas (state) {
  return {
    ...state,
    canvasData: {
      ...state.canvasData,
      viewBoxOffsetX: 0,
      viewBoxOffsetY: 0,
    },
  };
}
