export default function texturesRename (state, { id, name }) {
  const textures = state.textures.map((texture) => {
    if (texture.id === id) {
      return {
        ...texture,
        name,
      };
    }

    return texture;
  });

  return {
    ...state,
    textures,
  };
}
