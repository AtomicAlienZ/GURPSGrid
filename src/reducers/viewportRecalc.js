import getViewPortDimensions from '../utils/getViewPortDimensions';

export default function viewportRecalc (state) {
  const { width: viewPortW, height: viewPortH } = getViewPortDimensions();

  if (viewPortW !== state.canvasData.viewPortW || viewPortH !== state.canvasData.viewPortH) {
    return {
      ...state,
      canvasData: {
        ...state.canvasData,
        viewPortW,
        viewPortH,
      },
    };
  }

  return state;
}
