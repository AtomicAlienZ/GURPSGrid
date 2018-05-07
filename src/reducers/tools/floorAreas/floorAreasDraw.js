import { addToStateArray, removeFromStateArray, mapHasHex } from '../../../utils/hexStructures';
import { DRAWTYPE_FREEFORM } from '../../../config/drawTypes';
import { getActiveHexesMap } from '../../../selectors/index';

export default function floorAreasDraw (state, hex) {
  const { activeToolData: { editedAreaId } } = state;

  if (state.draw.type === DRAWTYPE_FREEFORM && editedAreaId) {
    const activeHexesMap = getActiveHexesMap(state);
    const func = state.draw.exclude ? removeFromStateArray : addToStateArray;

    const { floorAreas } = state;
    const newFloorAreas = floorAreas.map((area) => {
      if (area.id === editedAreaId && mapHasHex(activeHexesMap, hex)) {
        return {
          ...area,
          hexes: func(area.hexes, hex),
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
