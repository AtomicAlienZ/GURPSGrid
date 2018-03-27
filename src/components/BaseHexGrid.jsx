import React from 'react';
import PropTypes from 'prop-types';

import './BaseHexGrid.scss';

import { oddrToPixels } from '../utils/hexMath';
import { getAreaOutlinePath, getAreaInnerPath } from '../utils/hexDraw';
import { hexMapToArray } from '../utils/hexStructures';

class BaseHexGrid extends React.PureComponent {
  static propTypes = {
    activeHexesMap: PropTypes.instanceOf(Map).isRequired,
  };

  drawBg = () => {
    return getAreaOutlinePath(new Map(this.props.activeHexesMap));
  };

  getCoordTexts = () => {
    return hexMapToArray(this.props.activeHexesMap).map(({row, col}) => {
      const { x, y } = oddrToPixels({ row, col });

      return (
        <text
          key={`${row}-${col}`}
          className="BaseHexGrid__text"
          x={x}
          y={y}
        >
          {col} ; {row}
        </text>
      );
    });
  };

  drawActiveHexes = () => {
    return getAreaInnerPath(this.props.activeHexesMap);
  };

  render () {
    return (
      <g className="BaseHexGrid">
        <path d={this.drawBg()} className="BaseHexGrid__bg" />
        <path d={this.drawActiveHexes()} className="BaseHexGrid__grid" />
        {this.getCoordTexts()}
      </g>
    );
  }
}

export default BaseHexGrid;
