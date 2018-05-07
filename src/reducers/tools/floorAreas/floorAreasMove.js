export default function floorAreasMove (state, { id, moveUp }) {
  const { floorAreas } = state;
  const index = floorAreas.findIndex(({ id: textureId }) => id === textureId);
  const isMoveUp = moveUp && index < floorAreas.length - 1;
  const isMoveDown = !moveUp && index > 0;

  if (
    index >= 0
    && (isMoveUp || isMoveDown)
  ) {
    let swapIndex = index + ( isMoveUp ? 1 : -1 );
    const min = Math.min(index, swapIndex);
    const max = Math.max(index, swapIndex);

    return {
      ...state,
      floorAreas: [
        ...floorAreas.slice(0, min),
        floorAreas[max],
        ...floorAreas.slice(min + 1, max),
        floorAreas[min],
        ...floorAreas.slice(max + 1),
      ],
    };
  }

  return state;
}
