import { STORAGE_VERSION, STORAGE_SUBSTATE_ITEMS } from '../config/stateStorage';
import { getObjectPart } from './objectUtilities';
import getId from './getId';
import { dataUrlToFile } from '../utils/fileUtilities';

export function dehydrateState (state) {
  // Getting data needed to be saved
  let data = getObjectPart(state, STORAGE_SUBSTATE_ITEMS);

  // Dehydrating stuff
  if ('textures' in data) {
    data.textures = data.textures.map(({ id, name, dataUrl }) => ({ id, name, dataUrl }));
  }

  return JSON.stringify({
    id: getId(),
    version: STORAGE_VERSION,
    date: new Date().getTime(),
    data,
  });
}

export function rehydrateState (string) {
  let { version, data } = JSON.parse(string);

  if (version === STORAGE_VERSION) {
    // Rehydrating stuff
    if ('textures' in data) {
      data.textures = data.textures
        .map(({ id, name, dataUrl }) => {
          let file = dataUrlToFile(dataUrl, name);
          let preview = URL.createObjectURL(file);
          let size = file.size;
          let type = file.type;

          return {
            id,
            name,
            dataUrl,
            preview,
            size,
            type,
          };
        });
    }

    return data;
  }

  return null;
}
