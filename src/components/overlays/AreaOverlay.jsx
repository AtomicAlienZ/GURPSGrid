import React from 'react';
import PropTypes from 'prop-types';

import { getAreaOutlinePath, getAreaInnerPath } from '../../utils/hexDraw';
import { hexArrayToMap } from '../../utils/hexStructures';

class MouseOverlay extends React.PureComponent {
  static propTypes = {
    col: PropTypes.number,
    row: PropTypes.number,
    areaArray: PropTypes.array,
    classMod: PropTypes.string,
    drawGrid: PropTypes.bool,
  };

  static defaultProps = {
    drawGrid: false,
  };

  render () {
    const map = hexArrayToMap(this.props.areaArray || [[this.props.col, this.props.row]]);

    return (
      <g className="MouseOverlay">
        <path d={getAreaOutlinePath(map)} className={`MouseOverlay__bg MouseOverlay__bg_${this.props.classMod}`} />
        {this.props.drawGrid
        && <path d={getAreaInnerPath(map)} className={`MouseOverlay__grid MouseOverlay__grid_${this.props.classMod}`} />}
      </g>
    );
  }
}

export default MouseOverlay;
