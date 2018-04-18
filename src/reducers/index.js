import initialState from './initialState';
import {
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  MOUSE_LEAVE,
  CANVAS_CENTER,
  TOOL_SELECT,
  DRAW_SET_TYPE,
  DRAW_SET_EXCLUDE,
  VIEWPORT_RECALC,
  TEXTURES_ADD,
  TEXTURES_REMOVE,
  TEXTURES_RENAME,
  SAVELOAD_APPLY_LOADED,
} from '../actions/index';
import mouseMove from './mouseMove';
import mouseDown from '../reducers/mouseDown';
import mouseUp from '../reducers/mouseUp';
import mouseLeave from '../reducers/mouseLeave';
import centerCanvas from './canvasCenter';
import selectTool from './toolSelect';
import viewportRecalc from './viewportRecalc';
import drawSetType from './draw/drawSetType';
import drawSetExclude from './draw/drawSetExclude';
import texturesAdd from './tools/textures/texturesAdd';
import texturesRemove from './tools/textures/texturesRemove';
import texturesRename from './tools/textures/texturesRename';
import saveLoadApplyLoaded from './tools/saveLoad/saveLoadApplyLoaded';

import storeState from './storeState';

function reducer (state = initialState, action ) {
  let newState = state;

  switch (action.type) {
    case MOUSE_MOVE: newState = mouseMove(state, action); break;
    case MOUSE_DOWN: newState = mouseDown(state, action); break;
    case MOUSE_UP: newState = mouseUp(state, action); break;
    case MOUSE_LEAVE: newState = mouseLeave(state, action); break;
    case VIEWPORT_RECALC: newState = viewportRecalc(state, action); break;

    case CANVAS_CENTER: newState = centerCanvas(state, action); break;
    case TOOL_SELECT: newState = selectTool(state, action); break;

    case DRAW_SET_TYPE: newState = drawSetType(state, action); break;
    case DRAW_SET_EXCLUDE: newState = drawSetExclude(state, action); break;

    case TEXTURES_ADD: newState = texturesAdd(state, action); break;
    case TEXTURES_REMOVE: newState = texturesRemove(state, action); break;
    case TEXTURES_RENAME: newState = texturesRename(state, action); break;

    case SAVELOAD_APPLY_LOADED: newState = saveLoadApplyLoaded(state, action); break;

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
