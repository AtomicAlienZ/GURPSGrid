import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { connect } from 'react-redux';

import './App.scss';

import { mouseMove, mouseUp, mouseDown } from './actions/index';

import getGlobalMousePosition from './utils/getGlobalMousePosition';
import getSVGMousePosition from './utils/getSVGMousePosition';
import isLeftMouseButton from './utils/isLeftMouseButton';
import { MOUSEMOVE_THROTTLE_INTERVAL } from './constants/general';

import SVGCanvas from './components/SVGCanvas';
import ToolBar from './components/ToolBar';

class App extends React.PureComponent {
  static propTypes = {
    // objects: PropTypes.arrayOf(PropTypes.object),
    overlays: PropTypes.arrayOf(PropTypes.object),
    canvasData: PropTypes.object,

    mouseMove: PropTypes.func.isRequired,
    mouseDown: PropTypes.func.isRequired,
    mouseUp: PropTypes.func.isRequired,
  };

  throttledTrackMouse = _.throttle(
    (position, svgPosition) => {
      this.props.mouseMove(position, svgPosition);
    },
    MOUSEMOVE_THROTTLE_INTERVAL
  );

  trackMouse = (event) => {
    this.throttledTrackMouse(getGlobalMousePosition(event), getSVGMousePosition(event));
  };

  onMouseDown = (event) => {
    if (isLeftMouseButton(event)) {
      this.props.mouseDown(getGlobalMousePosition(event));
    }
  };

  onMouseUp = (event) => {
    if (isLeftMouseButton(event)) {
      this.props.mouseUp(getGlobalMousePosition(event));
    }
  };

  render () {
    return (
      <div className="App">
        <SVGCanvas
          data={this.props.canvasData}
          trackMouse={this.trackMouse}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
          overlays={this.props.overlays}
        >
          {/*TODO {this.props.objects}*/}
        </SVGCanvas>

        <ToolBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  objects: state.objects,
  overlays: state.overlays,
  canvasData: state.canvasData,
});

const mapDispatchToProps = (dispatch) => ({
  mouseMove (position, svgPosition) { dispatch(mouseMove(position, svgPosition)); },
  mouseDown (position) { dispatch(mouseDown(position)); },
  mouseUp (position) { dispatch(mouseUp(position)); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
