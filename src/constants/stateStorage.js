export const STORAGE_VERSION = '1.0';
export const STORAGE_KEY = 'GURPSGrid.savedState';
export const STORAGE_SUBSTATE_ITEMS = ['objects', 'activeHexes', 'floorAreas', 'textures'];
export const STORAGE = window.localStorage;
export const STORAGE_AVAILIABLE = (function iifeCheckStorage () {
  try {
    const key = '__storage_test__';
    STORAGE.setItem(key, key);
    STORAGE.removeItem(key);
    return true;
  }
  catch (e) {
    return e instanceof DOMException
      && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED'
      )
      // acknowledge QuotaExceededError only if there's something already stored
      && STORAGE.length !== 0;
  }
}());

export const STORAGE_FILE_EXTENSION = 'ggrid';
export const STORAGE_FILE_DEFAULT_NAME = 'GURPSGrid';
