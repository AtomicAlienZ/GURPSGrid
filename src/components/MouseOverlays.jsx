import React from 'react';
import PropTypes from 'prop-types';

import AreaOverlay from './overlays/AreaOverlay';

class MouseOverlays extends React.PureComponent {
  static propTypes = {
    overlays: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  renderOverlay = (overlayData, index) => {
    return (
      <AreaOverlay
        key={index}
        data={overlayData}
        areaArray={[[overlayData.col, overlayData.row]]}
      />
    );
  };

  render () {
    return (
      <g>
        {this.props.overlays.map(this.renderOverlay)}
      </g>
    );
  }
}

export default MouseOverlays;
