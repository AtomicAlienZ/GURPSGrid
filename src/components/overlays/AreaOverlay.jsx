import React from 'react';
import PropTypes from 'prop-types';

import './AreaOverlay.scss';

import { getAreaOutlinePath, getAreaInnerPath } from '../../utils/hexDraw';
import { hexArrayToMap } from '../../utils/hexStructures';

class AreaOverlay extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    areaArray: PropTypes.array.isRequired,
    drawGrid: PropTypes.bool,
  };

  static defaultProps = {
    drawGrid: false,
  };

  render () {
    const map = hexArrayToMap(this.props.areaArray);
    const classMod = this.props.data.type;

    return (
      <g className="AreaOverlay">
        <path d={getAreaOutlinePath(map)} className={`AreaOverlay__bg AreaOverlay__bg_${classMod}`} />
        {this.props.drawGrid
        && <path d={getAreaInnerPath(map)} className={`AreaOverlay__grid AreaOverlay__grid_${classMod}`} />}
      </g>
    );
  }
}

export default AreaOverlay;
