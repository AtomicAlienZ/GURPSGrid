import React from 'react';
import PropTypes from 'prop-types';

import './BaseHexGrid.scss';

import { oddrToPixels } from '../utils/hexMath';
import { getAreaOutlinePath, getAreaInnerPath } from '../utils/hexDraw';
import { hexArrayToMap } from '../utils/hexStructures';

class BaseHexGrid extends React.PureComponent {
  static propTypes = {
    activeHexes: PropTypes.array.isRequired,
  };

  drawBg = (map) => {
    return getAreaOutlinePath(map);
  };

  getCoordTexts = () => {
    return this.props.activeHexes.map(([col, row]) => {
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

  drawActiveHexes = (map) => {
    return getAreaInnerPath(map);
  };

  render () {
    const activeHexesMap = hexArrayToMap(this.props.activeHexes);
    return (
      <g className="BaseHexGrid">
        <path d={this.drawBg(activeHexesMap)} className="BaseHexGrid__bg" />
        <path d={this.drawActiveHexes(activeHexesMap)} className="BaseHexGrid__grid" />
        {this.getCoordTexts()}
      </g>
    );
  }
}

export default BaseHexGrid;
