export default function isLeftMouseButton (event) {
  return event.which === 1 || event.button === 0;
}
