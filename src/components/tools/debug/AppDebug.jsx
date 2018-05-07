import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './AppDebug.scss';

import { pixelsToOddr } from '../../../utils/hexMath';

class AppDebug extends React.PureComponent {
  static propTypes = {
    mouseData: PropTypes.object,
    canvasData: PropTypes.object,
  };

  render () {
    const hexOddr = pixelsToOddr(this.props.mouseData.svgPosition);
    return (
      <div className="AppDebug">
        <strong>Mouse:</strong> {this.props.mouseData.position.x} ; {this.props.mouseData.position.y}<br />
        <strong>Mouse Btn:</strong> {this.props.mouseData.buttonHeld ? 'True' : 'False'}<br />
        <strong>Mouse DragStart:</strong>{' '}
        {this.props.mouseData.dragStartPosition.x} ; {this.props.mouseData.dragStartPosition.y}
        <hr />
        <strong>ViewBox:</strong> {this.props.canvasData.viewBoxOffsetX} ; {this.props.canvasData.viewBoxOffsetY}<br />
        <strong>ViewBoxStartDrag:</strong>{' '}
        {this.props.canvasData.viewBoxStartDragOffsetX} ; {this.props.canvasData.viewBoxStartDragOffsetY}
        <hr />
        <strong>SVG inner mouse:</strong>{' '}
        {this.props.mouseData.svgPosition.x} ; {this.props.mouseData.svgPosition.y}<br />

        <strong>HEX coords:</strong> {hexOddr.col} ; {hexOddr.row}
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

export default connect(
  mapStateToProps,
)(AppDebug);
