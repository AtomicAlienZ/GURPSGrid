import AreaOverlay from '../components/overlays/mouseOverlays/AreaOverlay';
import RectangleOverlay from '../components/overlays/mouseOverlays/RectangleOverlay';
import LineOverlay from '../components/overlays/mouseOverlays/LineOverlay';
import CircleOverlay from '../components/overlays/mouseOverlays/CircleOverlay';

export const DRAW_1HEX = 'DRAW_1HEX';
export const DRAW_AREA = 'DRAW_AREA';
export const DRAW_RECT = 'DRAW_RECT';
export const DRAW_LINE = 'DRAW_LINE';
export const DRAW_CIRC = 'DRAW_CIRC';

export const DRAW_OVERLAYS = [DRAW_1HEX, DRAW_AREA, DRAW_CIRC, DRAW_LINE, DRAW_RECT];

export const OVERLAYS_COMPONENTS_MAP = {
  [DRAW_1HEX]: AreaOverlay,
  [DRAW_AREA]: AreaOverlay,
  [DRAW_RECT]: RectangleOverlay,
  [DRAW_LINE]: LineOverlay,
  [DRAW_CIRC]: CircleOverlay,
};
