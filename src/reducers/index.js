import initialState from './initialState';
import {
  MOUSE_MOVE,
  MOUSE_DOWN,
  MOUSE_UP,
  CENTER_CANVAS,
  SELECT_TOOL
} from '../actions/index';
import mouseMove from './mouseMove';
import mouseDown from '../reducers/mouseDown';
import mouseUp from '../reducers/mouseUp';
import centerCanvas from '../reducers/centerCanvas';
import selectTool from '../reducers/selectTool';

function reducer (state = initialState, action ) {
  switch (action.type) {
    case MOUSE_MOVE: return mouseMove(state, action); break;
    case MOUSE_DOWN: return mouseDown(state, action); break;
    case MOUSE_UP: return mouseUp(state, action); break;
    case CENTER_CANVAS: return centerCanvas(state, action); break;
    case SELECT_TOOL: return selectTool(state, action); break;
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn('Unknown action type', action.type, action);
      }

      return state;
  }
}

export default reducer;
