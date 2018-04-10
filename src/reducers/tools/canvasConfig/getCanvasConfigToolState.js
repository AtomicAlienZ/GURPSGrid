export default function getCanvasConfigToolState () {
  return {
    drawType: null,
    drawExclude: false,
    drawFloorTiles: false,

    // Used to detect hex coordinates change to draw only when needed
    drawPrevCol: null,
    drawPrevRow: null,

    startCol: null,
    startRow: null,
  };
}
