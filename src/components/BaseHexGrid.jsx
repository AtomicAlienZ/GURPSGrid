import React from 'react';
import PropTypes from 'prop-types';

import './BaseHexGrid.scss';

import { getHexVerticeCoords, isEven, oddrToPixels } from '../utils/hexMath';

class BaseHexGrid extends React.PureComponent {
  static propTypes = {
    minCol: PropTypes.number.isRequired,
    maxCol: PropTypes.number.isRequired,
    minRow: PropTypes.number.isRequired,
    maxRow: PropTypes.number.isRequired,
  };

  getGridPath = () => {
    let path = [];
    const { minCol, maxCol, minRow, maxRow } = this.props;

    for (let col = minCol; col <= maxCol; col++) {
      for (let row = minRow; row <= maxRow; row++) {
        let startVertice = -2;
        let endVertice = 2;

        // First row - full hexagons
        if (row === minRow) {
          if (isEven(row)) {
            startVertice = -3;
            endVertice = 2;

            if (col === minCol) {
              startVertice = -5;
              endVertice = 1;
            }
          }
          else {
            startVertice = -3;

            if (col === minCol) {
              startVertice = -4;
            }
          }
        }
        else if (isEven(row) && col === minCol) {
          startVertice = -5;
          endVertice = 1;
        }
        else if (!isEven(row) && col === minCol) {
          startVertice = -4;
        }

        if (row === maxRow) {
          endVertice = 3;
        }

        for (let k = startVertice; k < endVertice; k++) {
          const { vertX, vertY } = getHexVerticeCoords({ row, col }, k);
          path.push(k === startVertice ? 'M' : 'L', vertX, vertY);
        }

        // path.push('Z');
      }
    }

    return path.join(' ');
  };

  getBGPath = () => {
    let path = [];
    const { minCol, maxCol, minRow, maxRow } = this.props;

    // Top boundary
    for (let col = minCol; col <= maxCol; col++) {
      for (let i = 3; i <= 4; i++) {
        let vert = getHexVerticeCoords({ row: minRow, col }, i);
        path.push(col === minCol && i === 3 ? 'M' : 'L', vert.vertX, vert.vertY);
      }
    }

    // Right boundary
    for (let row = minRow; row <= maxRow; row++) {
      for (let i = -1; i <= 0; i++) {
        let vert = getHexVerticeCoords({ row, col: maxCol }, i);
        path.push('L', vert.vertX, vert.vertY);
      }
    }

    // Bottom boundary
    for (let col = maxCol; col >= minCol; col--) {
      for (let i = 0; i <= 1; i++) {
        let vert = getHexVerticeCoords({ row: maxRow, col }, i);
        path.push(col === minRow && i === 3 ? 'M' : 'L', vert.vertX, vert.vertY);
      }
    }

    let vert = getHexVerticeCoords({ row: maxRow, col: minCol }, 2);
    path.push('L', vert.vertX, vert.vertY);

    // Left boundary
    for (let row = maxRow; row >= minRow; row--) {
      for (let i = 2; i <= 3; i++) {
        let vert = getHexVerticeCoords({ row, col: minCol }, i);
        path.push('L', vert.vertX, vert.vertY);
      }
    }

    path.push('Z');

    return path.join(' ');
  };

  getCoordTexts = () => {
    let texts = [];
    const { minCol, maxCol, minRow, maxRow } = this.props;

    for (let col = minCol; col <= maxCol; col++) {
      for (let row = minRow; row <= maxRow; row++) {
        const { x, y } = oddrToPixels({ row, col });

        texts.push(
          <text
            key={`${row}-${col}`}
            className="BaseHexGrid__text"
            x={x}
            y={y}
          >
            {col} ; {row}
          </text>
        );
      }
    }

    return texts;
  };

  render () {
    return (
      <g className="BaseHexGrid">
        <path d={this.getBGPath()} className="BaseHexGrid__bg" />
        <path d={this.getGridPath()} className="BaseHexGrid__grid" />
        {this.getCoordTexts()}
      </g>
    );
  }
}

export default BaseHexGrid;
