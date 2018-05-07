export default function floorAreasDelete (state, { id: idToDelete }) {
  const { floorAreas } = state;

  const newFloorAreas = floorAreas.filter(({ id }) => id !== idToDelete);

  if (newFloorAreas.length !== floorAreas.length) {
    return {
      ...state,
      floorAreas: newFloorAreas,
    };
  }

  return state;
}
