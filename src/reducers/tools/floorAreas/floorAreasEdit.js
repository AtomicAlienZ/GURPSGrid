import drawSetType from '../../draw/drawSetType';

export default function floorAreasEdit (state, { id }) {
  const { activeToolData: { selectedAreaId, editedAreaId } } = state;

  if (editedAreaId !== id || selectedAreaId !== id) {
    let newState = {
      ...state,
      activeToolData: {
        ...state.activeToolData,
        selectedAreaId: id,
        editedAreaId: id,
      },
    };

    if (id === null) {
      newState = drawSetType(newState, { drawType: null });
    }

    return newState;
  }

  return state;
}
