export const TOOL_CANVASCONFIG = 'canvas-config';
export const TOOL_DEBUG = 'debug';
export const TOOL_TEXTURES = 'textures';
export const TOOL_SAVELOAD = 'save-load';
export const TOOL_FLOORAREAS = 'TOOL_FLOORAREAS';
// export const TOOL_ = '';

// Components
import SaveLoad from '../components/tools/saveLoad/SaveLoad';
import Textures from '../components/tools/textures/Textures';
import CanvasConfig from '../components/tools/canvasConfig/CanvasConfig';
import AppDebug from '../components/tools/debug/AppDebug';

// Components' subreducers
import canvasConfigDraw from '../reducers/tools/canvasConfig/canvasConfigDraw';
import canvasConfigStartDraw from '../reducers/tools/canvasConfig/canvasConfigStartDraw';
import canvasConfigEndDraw from '../reducers/tools/canvasConfig/canvasConfigEndDraw';

export const TOOLS = [
  TOOL_CANVASCONFIG,
  TOOL_TEXTURES,
  TOOL_FLOORAREAS,
  TOOL_SAVELOAD,

  TOOL_DEBUG,
];

/**
 * Configuration object for tools
 */
export const TOOLS_DATA_MAP = {
  [TOOL_CANVASCONFIG]: {
    name: 'Canvas Tools',
    icon: 'wrench',
    component: CanvasConfig,
    onActive: null,
    onInactive: null,
    onMouseMove: null,
    onDrawStart: canvasConfigStartDraw,
    onDraw: canvasConfigDraw,
    onDrawEnd: canvasConfigEndDraw,
  },
  [TOOL_DEBUG]: {
    name: 'Debug tools',
    icon: 'bug',
    component: AppDebug,
    onActive: null,
    onInactive: null,
    onDrawStart: null,
    onDraw: null,
    onDrawEnd: null,
  },
  [TOOL_TEXTURES]: {
    name: 'Textures',
    icon: 'texture',
    component: Textures,
    onActive: null,
    onInactive: null,
    onDrawStart: null,
    onDraw: null,
    onDrawEnd: null,
  },
  [TOOL_SAVELOAD]: {
    name: 'Save / Load',
    icon: 'content-save',
    component: SaveLoad,
    onActive: null,
    onInactive: null,
    onDrawStart: null,
    onDraw: null,
    onDrawEnd: null,
  },
  [TOOL_FLOORAREAS]: {
    name: 'Floor Areas',
    icon: 'hexagon-multiple',
    component: null,
    onActive: null,
    onInactive: null,
    onDrawStart: null,
    onDraw: null,
    onDrawEnd: null,
  },
};
