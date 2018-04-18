import {
  STORAGE_KEY,
  STORAGE_SUBSTATE_ITEMS,
  STORAGE_AVAILIABLE,
  STORAGE,
} from '../config/stateStorage';
import { dehydrateState } from '../utils/stateStorageUtilities';

export default function storeState (state, newState) {
  // Checking whether we need to actually save things
  let save = (
    STORAGE_AVAILIABLE
    && state !== newState
    && !!STORAGE_SUBSTATE_ITEMS.find((key) => state[key] !== newState[key])
  );

  if (save) {
    const savedState = dehydrateState(newState);

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
