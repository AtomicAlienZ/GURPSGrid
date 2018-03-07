export default function getSVGMousePosition (event) {
  // Find your root SVG element
  let svg = event.target;

  // Getting an SVG parent
  while (svg && svg.tagName !== 'svg') {
    svg = svg.parentNode;
  }

  if (!svg) {
    return {
      x: 0,
      y: 0,
    };
  }

  // Create an SVGPoint for future math
  let pt = svg.createSVGPoint();

  // Get point in global SVG space
  pt.x = event.clientX;
  pt.y = event.clientY;

  const realPoint = pt.matrixTransform(svg.getScreenCTM().inverse());

  return {
    x: realPoint.x,
    y: realPoint.y,
  };
}
