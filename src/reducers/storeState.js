import getId from '../utils/getId';
import { getObjectPart } from '../utils/objectUtilities';
import {
  STORAGE_VERSION,
  STORAGE_KEY,
  STORAGE_SUBSTATE_ITEMS,
  STORAGE_AVAILIABLE,
  STORAGE,
} from '../constants/stateStorage';

export default function storeState (state, newState) {
  // Checking whether we need to actually save things
  let save = (
    STORAGE_AVAILIABLE
    && state !== newState
    && !!STORAGE_SUBSTATE_ITEMS.find((key) => state[key] !== newState[key])
  );

  if (save) {
    // Getting data needed to be saved
    let data = getObjectPart(newState, STORAGE_SUBSTATE_ITEMS);

    if ('textures' in data) {
      data.textures = data.textures.map(({ id, name, dataUrl }) => ({ id, name, dataUrl }));
    }

    const savedState = JSON.stringify({
      id: getId(),
      version: STORAGE_VERSION,
      date: new Date().getTime(),
      data,
    });

    try {
      STORAGE.setItem(STORAGE_KEY, savedState);

      return {
        ...newState,
        storageSaveError: null,
      };
    }
    catch (e) {
      return {
        ...newState,
        storageSaveError: e.name,
      };
    }
  }

  return newState;
}
