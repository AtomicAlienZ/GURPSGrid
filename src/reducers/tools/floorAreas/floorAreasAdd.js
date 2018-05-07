import getId from '../../../utils/getId';

export default function floorAreasAdd (state, { data: { name, textureId } }) {
  const sanitizedName = (name && name.trim()) || '';
  const texture = state.textures.find(({ id }) => id === textureId) || null;

  if (sanitizedName || texture) {
    const id = getId();
    return {
      ...state,
      floorAreas: [
        ...state.floorAreas,
        {
          id,
          name: sanitizedName,
          textureId: texture && texture.id,
          hexes: [],
        },
      ],
      activeToolData: {
        ...state.activeToolData,
        selectedAreaId: id,
        editedAreaId: id,
      },
    };
  }

  return state;
}
