import React from 'react';
import PropTypes from 'prop-types';

import { getHexCircle, oddrToPixels } from '../../../utils/hexMath';
import { hexArrayToMap } from '../../../utils/hexStructures';
import { getAreaOutlinePath } from '../../../utils/hexDraw';

class CircleOverlay extends React.PureComponent {
  static propTypes = {
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    radius: PropTypes.number,
    pixelRadius: PropTypes.number,
    classMod: PropTypes.string,
  };

  static defaultProps = {
    radius: 0,
    pixelRadius: 0,
  };

  render () {
    const center = { col: this.props.col, row: this.props.row };
    const centerPixels = oddrToPixels(center);

    let outline = getAreaOutlinePath(hexArrayToMap(getHexCircle(center, this.props.radius)));

    return (
      <g className="MouseOverlay">
        <path d={outline} className={`MouseOverlay__bg MouseOverlay__bg_${this.props.classMod}`} />

        <circle
          cx={centerPixels.x}
          cy={centerPixels.y}
          r={this.props.pixelRadius}
          className="MouseOverlay__aux"
        />
      </g>
    );
  }
}

export default CircleOverlay;

