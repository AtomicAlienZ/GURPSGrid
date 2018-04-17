import { rehydrateState } from '../../../utils/stateStorageUtilities';

export default function saveLoadApplyLoaded (state, action) {
  const { data } = action;

  return {
    ...state,
    ...rehydrateState(data),
  };
}
