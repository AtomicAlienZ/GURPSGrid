// Canvas generic actions
export const MOUSE_MOVE = 'MOUSE_MOVE';
export const mouseMove = (position, svgPosition) => ({ type: MOUSE_MOVE, position, svgPosition });

export const MOUSE_DOWN = 'MOUSE_DOWN';
export const mouseDown = (position, svgPosition) => ({ type: MOUSE_DOWN, position, svgPosition });

export const MOUSE_UP = 'MOUSE_UP';
export const mouseUp = (position) => ({ type: MOUSE_UP, position });

// Canvas centering action
export const CANVAS_CENTER = 'CANVAS_CENTER';
export const centerCanvas = () => ({ type: CANVAS_CENTER });

// Tools select action
export const TOOL_SELECT = 'TOOL_SELECT';
export const selectTool = (tool) => ({ type: TOOL_SELECT, tool });

// Viewport resize action
export const VIEWPORT_RECALC = 'VIEWPORT_RECALC';
export const viewportRecalc = (tool) => ({ type: VIEWPORT_RECALC, tool });

// ================================ Tool-specific actions ================================

// CanvasConfig tool actions
export const CANVASCONFIG_CHANGE_PROP = 'CANVASCONFIG_CHANGE_PROP';
export const canvasConfigChangeProp = (prop, value) => ({ type: CANVASCONFIG_CHANGE_PROP, prop, value });

// Textures tool actions
export const TEXTURES_ADD = 'TEXTURES_ADD';
export const texturesAdd = (file, dataUrl) => ({ type: TEXTURES_ADD, file, dataUrl });

export const TEXTURES_RENAME = 'TEXTURES_RENAME';
export const texturesRename = (id, name) => ({ type: TEXTURES_RENAME, id, name });

export const TEXTURES_REMOVE = 'TEXTURES_REMOVE';
export const texturesRemove = (id) => ({ type: TEXTURES_REMOVE, id });
