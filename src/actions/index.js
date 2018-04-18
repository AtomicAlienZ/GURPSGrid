// Canvas generic actions
export const MOUSE_MOVE = 'MOUSE_MOVE';
export const mouseMove = (position, svgPosition) => ({ type: MOUSE_MOVE, position, svgPosition });

export const MOUSE_DOWN = 'MOUSE_DOWN';
export const mouseDown = (position, svgPosition) => ({ type: MOUSE_DOWN, position, svgPosition });

export const MOUSE_UP = 'MOUSE_UP';
export const mouseUp = (position) => ({ type: MOUSE_UP, position });

export const MOUSE_LEAVE = 'MOUSE_LEAVE';
export const mouseLeave = (position, svgPosition) => ({ type: MOUSE_LEAVE, position, svgPosition });

// Canvas centering action
export const CANVAS_CENTER = 'CANVAS_CENTER';
export const centerCanvas = () => ({ type: CANVAS_CENTER });

// Tools select action
export const TOOL_SELECT = 'TOOL_SELECT';
export const selectTool = (tool) => ({ type: TOOL_SELECT, tool });

// Viewport resize action
export const VIEWPORT_RECALC = 'VIEWPORT_RECALC';
export const viewportRecalc = (tool) => ({ type: VIEWPORT_RECALC, tool });

// Draw actions
export const DRAW_SET_TYPE = 'DRAW_SET_TYPE';
export const drawSetType = (drawType) => ({ type: DRAW_SET_TYPE, drawType });

export const DRAW_SET_EXCLUDE = 'DRAW_SET_EXCLUDE';
export const drawSetExclude = (exclude) => ({ type: DRAW_SET_EXCLUDE, exclude });

// ================================ Tool-specific actions ================================

// Textures tool actions
export const TEXTURES_ADD = 'TEXTURES_ADD';
export const texturesAdd = (file, dataUrl) => ({ type: TEXTURES_ADD, file, dataUrl });

export const TEXTURES_RENAME = 'TEXTURES_RENAME';
export const texturesRename = (id, name) => ({ type: TEXTURES_RENAME, id, name });

export const TEXTURES_REMOVE = 'TEXTURES_REMOVE';
export const texturesRemove = (id) => ({ type: TEXTURES_REMOVE, id });

// SaveLoad actions
export const SAVELOAD_APPLY_LOADED = 'SAVELOAD_APPLY_LOADED';
export const saveLoadApplyLoaded = (data) => ({ type: SAVELOAD_APPLY_LOADED, data });
