export default function floorAreasSelect (state, { id }) {
  const { activeToolData: { selectedAreaId, editedAreaId } } = state;

  if (!editedAreaId) {
    return {
      ...state,
      activeToolData: {
        ...state.activeToolData,
        selectedAreaId: selectedAreaId !== id ? id : null,
      },
    };
  }

  return state;
}
