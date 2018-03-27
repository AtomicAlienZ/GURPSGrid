import React from 'react';
import PropTypes from 'prop-types';

import './SVGCanvas.scss';

import BaseHexGrid from './BaseHexGrid';

class SVGCanvas extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
    data: PropTypes.object.isRequired,

    trackMouse: PropTypes.func.isRequired,
    onMouseDown: PropTypes.func.isRequired,
    onMouseUp: PropTypes.func.isRequired,
  };

  render () {
    const { viewBoxOffsetX, viewBoxOffsetY, viewPortW, viewPortH } = this.props.data;

    const viewBoxX = 0 - ((viewPortW) / 2) - viewBoxOffsetX;
    const viewBoxY = 0 - ((viewPortH) / 2) - viewBoxOffsetY;

    return (
      <svg
        id="GURPSGrid-canvas-SVG"
        preserveAspectRatio="none"
        className="SVGCanvas"
        viewBox={`${viewBoxX} ${viewBoxY} ${viewPortW} ${viewPortH}`}
        onMouseMove={this.props.trackMouse}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
      >
        <BaseHexGrid
          activeHexes={this.props.data.activeHexes}
          activeHexesMap={this.props.data.activeHexesMap}
        />

        {this.props.children}
      </svg>
    );
  }
}

export default SVGCanvas;
