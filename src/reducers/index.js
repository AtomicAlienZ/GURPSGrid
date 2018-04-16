import initialState from './initialState';
import {
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  CANVAS_CENTER,
  TOOL_SELECT,
  VIEWPORT_RECALC,
  CANVASCONFIG_CHANGE_PROP,
  TEXTURES_ADD,
  TEXTURES_REMOVE,
  TEXTURES_RENAME,
} from '../actions/index';
import mouseMove from './mouseMove';
import mouseDown from '../reducers/mouseDown';
import mouseUp from '../reducers/mouseUp';
import centerCanvas from './canvasCenter';
import selectTool from './toolSelect';
import viewportRecalc from './viewportRecalc';
import canvasConfigChangeProp from './tools/canvasConfig/canvasConfigChangeProp';
import texturesAdd from './tools/textures/texturesAdd';
import texturesRemove from './tools/textures/texturesRemove';
import texturesRename from './tools/textures/texturesRename';

import storeState from './storeState';

function reducer (state = initialState, action ) {
  let newState = state;

  switch (action.type) {
    case MOUSE_MOVE: newState = mouseMove(state, action); break;
    case MOUSE_DOWN: newState = mouseDown(state, action); break;
    case MOUSE_UP: newState = mouseUp(state, action); break;
    case VIEWPORT_RECALC: newState = viewportRecalc(state, action); break;

    case CANVAS_CENTER: newState = centerCanvas(state, action); break;
    case TOOL_SELECT: newState = selectTool(state, action); break;

    case CANVASCONFIG_CHANGE_PROP: newState = canvasConfigChangeProp(state, action); break;

    case TEXTURES_ADD: newState = texturesAdd(state, action); break;
    case TEXTURES_REMOVE: newState = texturesRemove(state, action); break;
    case TEXTURES_RENAME: newState = texturesRename(state, action); break;

    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unknown action type', action.type, action);
      }
      break;
  }

  newState = storeState(state, newState);

  return newState;
}

export default reducer;
