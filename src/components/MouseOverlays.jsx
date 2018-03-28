import React from 'react';
import PropTypes from 'prop-types';

import './MouseOverlays.scss';

import AreaOverlay from './overlays/AreaOverlay';
import RectangleOverlay from './overlays/RectangleOverlay';
import LineOverlay from './overlays/LineOverlay';

import {
  CANVASCONFIGTOOL_RECT,
  CANVASCONFIGTOOL_LINE,
  // CANVASCONFIGTOOL_CIRCLE,
} from '../constants/mouseOverlays';

class MouseOverlays extends React.PureComponent {
  static propTypes = {
    overlays: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  renderOverlay = (overlayData, index) => {
    switch (overlayData.type) {
      case CANVASCONFIGTOOL_LINE:
        return (
          <LineOverlay
            key={index}
            classMod={overlayData.type}
            fromCol={overlayData.startCol}
            fromRow={overlayData.startRow}
            toCol={overlayData.col}
            toRow={overlayData.row}
          />
        );
        break;

      case CANVASCONFIGTOOL_RECT:
        return (
          <RectangleOverlay
            key={index}
            classMod={overlayData.type}
            fromCol={overlayData.startCol}
            fromRow={overlayData.startRow}
            toCol={overlayData.col}
            toRow={overlayData.row}
          />
        );
        break;

      // Simple single hex
      default:
        return (
          <AreaOverlay
            key={index}
            classMod={overlayData.type}
            areaArray={[[overlayData.col, overlayData.row]]}
          />
        );
        break;
    }
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
