export const MOUSE_MOVE = 'MOUSE_MOVE';
export const mouseMove = (position, svgPosition) => ({ type: MOUSE_MOVE, position, svgPosition });

export const MOUSE_DOWN = 'MOUSE_DOWN';
export const mouseDown = (position) => ({ type: MOUSE_DOWN, position });

export const MOUSE_UP = 'MOUSE_UP';
export const mouseUp = (position) => ({ type: MOUSE_UP, position });

export const CENTER_CANVAS = 'CENTER_CANVAS';
export const centerCanvas = () => ({ type: CENTER_CANVAS });

export const SELECT_TOOL = 'SELECT_TOOL';
export const selectTool = (tool) => ({ type: SELECT_TOOL, tool });
