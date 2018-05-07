import {
  mergeStateArrays,
  substractStateArrays,
  intersectMapAndArray,
} from '../../../utils/hexStructures';
import { getActiveHexesMap } from '../../../selectors/index';

export default function floorAreasEndDraw (state, newHexes) {
  const { activeToolData: { editedAreaId } } = state;
  const activeHexesMap = getActiveHexesMap(state);

  if (editedAreaId) {
    const func = state.draw.exclude ? substractStateArrays : mergeStateArrays;
    const { floorAreas } = state;
    const newFloorAreas = floorAreas.map((area) => {
      if (area.id === editedAreaId) {
        return {
          ...area,
          hexes: func(area.hexes, intersectMapAndArray(activeHexesMap, newHexes)),
        };
      }

      return area;
    });

    return {
      ...state,
      floorAreas: newFloorAreas,
    };
  }

  return state;
}
