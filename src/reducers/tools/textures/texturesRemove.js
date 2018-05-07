export default function texturesRemove (state, { id }) {
  const texture = state.textures.find(({ id: textureId }) => textureId === id);
  const textures = state.textures.filter(({ id: textureId }) => textureId !== id);

  if (texture) {
    URL.revokeObjectURL(texture.preview);
  }

  return {
    ...state,
    textures,
  };
}
