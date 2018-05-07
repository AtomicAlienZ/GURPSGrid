export default function getGlobalMousePosition (event) {
  return {
    x: event.clientX,
    y: event.clientY,
  };
}
