import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './BaseHexGrid.scss';

import { oddrToPixels } from '../utils/hexMath';
import { getActiveHexes, getActiveHexesInnerPath, getActiveHexesOutlinePath } from '../selectors/index';

class BaseHexGrid extends React.PureComponent {
  static propTypes = {
    activeHexes: PropTypes.array.isRequired,
    activeHexesOutlinePath: PropTypes.string.isRequired,
    activeHexesInnerPath: PropTypes.string.isRequired,
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

  render () {
    return (
      <g className="BaseHexGrid">
        <path d={this.props.activeHexesOutlinePath} className="BaseHexGrid__bg" />
        <path d={this.props.activeHexesInnerPath} className="BaseHexGrid__grid" />
        {this.getCoordTexts()}
      </g>
    );
  }
}

const mapStateToProps = (state) => ({
  activeHexes: getActiveHexes(state),
  activeHexesOutlinePath: getActiveHexesOutlinePath(state),
  activeHexesInnerPath: getActiveHexesInnerPath(state),
});

export default connect(mapStateToProps)(BaseHexGrid);
