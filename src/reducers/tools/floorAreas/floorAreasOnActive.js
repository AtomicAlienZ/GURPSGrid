export default function floorAreasOnActive (state) {
  return {
    ...state,
    activeToolData: {
      selectedAreaId: null,
      editedAreaId: null,
    },
  };
}
