export default function floorAreasUpdate (state, { data }) {
  return {
    ...state,
    floorAreas: state.floorAreas.map((area) => {
      if (area.id === data.id) {
        return {
          ...area,
          ...data,
        };
      }

      return area;
    }),
  };
}
