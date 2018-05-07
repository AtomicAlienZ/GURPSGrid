import getId from '../../../utils/getId';

export default function texturesAdd (state, { file, dataUrl }) {
  const { name, preview, size, type } = file;
  return {
    ...state,
    textures: [
      ...state.textures,
      {
        id: getId(),
        dataUrl,
        name,
        preview,
        size,
        type,
      },
    ],
  };
}
