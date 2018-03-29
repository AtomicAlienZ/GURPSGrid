import initialState from './initialState';
import {
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  CANVAS_CENTER,
  TOOL_SELECT,
  CANVASCONFIG_CHANGE_PROP,
} from '../actions/index';
import mouseMove from './mouseMove';
import mouseDown from '../reducers/mouseDown';
import mouseUp from '../reducers/mouseUp';
import centerCanvas from './canvasCenter';
import selectTool from './toolSelect';
import canvasConfigChangeProp from './tools/canvasConfig/canvasConfigChangeProp';

function reducer (state = initialState, action ) {
  let newState = state;

  switch (action.type) {
    case MOUSE_MOVE: newState = mouseMove(state, action); break;
    case MOUSE_DOWN: newState = mouseDown(state, action); break;
    case MOUSE_UP: newState = mouseUp(state, action); break;
    case CANVAS_CENTER: newState = centerCanvas(state, action); break;
    case TOOL_SELECT: newState = selectTool(state, action); break;
    case CANVASCONFIG_CHANGE_PROP: newState = canvasConfigChangeProp(state, action); break;
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unknown action type', action.type, action);
      }
      break;
  }

  return newState;
}

export default reducer;
