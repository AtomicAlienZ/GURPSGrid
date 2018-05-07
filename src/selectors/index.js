import { createSelector } from 'reselect';

import { hexArrayToMap } from '../utils/hexStructures';
import { getAreaOutlinePath, getAreaInnerPath } from '../utils/hexDraw';
import { createSimpleCache } from '../utils/simpleWeakMapCache';
import { TOOL_FLOORAREAS } from '../config/tools';

// Move to /caches?
export const getAreaMapCached = createSimpleCache((hexes) => hexArrayToMap(hexes));
export const getAreaPathCached = createSimpleCache((hexes) => getAreaOutlinePath(getAreaMapCached(hexes)));
export const getAreaInnerPathCached = createSimpleCache((hexes) => getAreaInnerPath(getAreaMapCached(hexes)));

export const getActiveHexes = ({ activeHexes }) => activeHexes;

export const getActiveHexesMap = createSelector(
  [getActiveHexes],
  (activeHexes) => hexArrayToMap(activeHexes)
);

export const getActiveHexesOutlinePath = createSelector(
  [getActiveHexes],
  (activeHexes) => getAreaPathCached(activeHexes)
);

export const getActiveHexesInnerPath = createSelector(
  [getActiveHexes],
  (activeHexes) => getAreaInnerPathCached(activeHexes)
);

export const getTextures = ({ textures }) => textures;

export const getFloorAreas = ({ floorAreas }) => floorAreas;

export const getActiveTool = ({ activeTool }) => activeTool;

export const getActiveToolData = ({ activeToolData }) => activeToolData;

// TODO refactor this to be memoized properly
export const getCurrentFloorAreaPath = createSelector(
  [getFloorAreas, getActiveTool, getActiveToolData],
  (areas, tool, toolData) => {
    if (tool === TOOL_FLOORAREAS) {
      const { selectedAreaId } = toolData;
      const area = areas.find(({ id }) => id === selectedAreaId);

      if (area) {
        return getAreaPathCached(area.hexes);
      }
    }

    return null;
  }
);

// export const getFloorAreaByIdProp = ({ floorAreas }, { id }) => floorAreas.find(({ id: areaId }) => areaId === id);
