export const TOOL_DRAG = 'canvas-drag';
export const TOOL_CANVASCONFIG = 'canvas-config';
export const TOOL_DEBUG = 'debug';
// export const TOOL_ = '';

export const TOOLS = [
  TOOL_DRAG,
  TOOL_CANVASCONFIG,
  TOOL_DEBUG,
];

export const TOOLS_DATA_MAP = {
  [TOOL_DRAG]: {
    name: 'Drag Canvas',
    icon: 'cursor-move',
  },
  [TOOL_CANVASCONFIG]: {
    name: 'Canvas Tools',
    icon: 'wrench',
  },
  [TOOL_DEBUG]: {
    name: 'Debug tools',
    icon: 'bug',
  },
};
