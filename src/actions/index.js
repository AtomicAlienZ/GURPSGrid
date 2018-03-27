export const MOUSE_MOVE = 'MOUSE_MOVE';
export const mouseMove = (position, svgPosition) => ({ type: MOUSE_MOVE, position, svgPosition });

export const MOUSE_DOWN = 'MOUSE_DOWN';
export const mouseDown = (position) => ({ type: MOUSE_DOWN, position });

export const MOUSE_UP = 'MOUSE_UP';
export const mouseUp = (position) => ({ type: MOUSE_UP, position });

export const CANVAS_CENTER = 'CANVAS_CENTER';
export const centerCanvas = () => ({ type: CANVAS_CENTER });

export const TOOL_SELECT = 'TOOL_SELECT';
export const selectTool = (tool) => ({ type: TOOL_SELECT, tool });
