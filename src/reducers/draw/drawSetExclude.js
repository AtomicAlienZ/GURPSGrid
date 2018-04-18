export default function drawSetExclude (state, { exclude }) {
  if (exclude === state.draw.exclude) {
    return state;
  }

  return {
    ...state,
    draw: {
      ...state.draw,
      exclude,
    },
  };
}
