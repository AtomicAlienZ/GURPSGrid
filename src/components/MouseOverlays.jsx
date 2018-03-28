import React from 'react';
import PropTypes from 'prop-types';

import './MouseOverlays.scss';

import AreaOverlay from './overlays/AreaOverlay';
import RectangleOverlay from './overlays/RectangleOverlay';
import LineOverlay from './overlays/LineOverlay';
import CircleOverlay from './overlays/CircleOverlay';

import {
  CANVASCONFIGTOOL_RECT,
  CANVASCONFIGTOOL_LINE,
  CANVASCONFIGTOOL_CIRCLE,
} from '../constants/mouseOverlays';

class MouseOverlays extends React.PureComponent {
  static propTypes = {
    overlays: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  renderOverlay = (overlayData, index) => {
    switch (overlayData.type) {
      case CANVASCONFIGTOOL_CIRCLE:
        return (
          <CircleOverlay
            key={index}
            classMod={overlayData.type}
            col={overlayData.col}
            row={overlayData.row}
            radius={overlayData.radius}
            pixelRadius={overlayData.pixelRadius}
          />
        );
        break;

      case CANVASCONFIGTOOL_LINE:
        return (
          <LineOverlay
            key={index}
            classMod={overlayData.type}
            col={overlayData.col}
            row={overlayData.row}
            toCol={overlayData.toCol}
            toRow={overlayData.toRow}
          />
        );
        break;

      case CANVASCONFIGTOOL_RECT:
        return (
          <RectangleOverlay
            key={index}
            classMod={overlayData.type}
            col={overlayData.col}
            row={overlayData.row}
            toCol={overlayData.toCol}
            toRow={overlayData.toRow}
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
