import React from 'react';

import MouseOverlays from './overlays/MouseOverlays';
import FloorAreasOverlays from './overlays/FloorAreasOverlays';

/**
 * This component is just a container for all overlays
 */
class Overlays extends React.PureComponent {
  render () {
    return (
      <g>
        {/* Mouse overlays */}
        {/* TODO Refactor because overlays are derived data */}
        <MouseOverlays />

        {/* Component-specific overlays here */}
        <FloorAreasOverlays testProp="testValue" />
      </g>
    );
  }
}

export default Overlays;
