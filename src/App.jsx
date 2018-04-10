import React from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import { connect } from 'react-redux';
import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
// import 'react-s-alert/dist/s-alert-css-effects/scale.css';
// import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
// import 'react-s-alert/dist/s-alert-css-effects/flip.css';
// import 'react-s-alert/dist/s-alert-css-effects/genie.css';
// import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
// import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';

import './App.scss';

import { mouseMove, mouseUp, mouseDown, viewportRecalc } from './actions/index';

import getGlobalMousePosition from './utils/getGlobalMousePosition';
import getSVGMousePosition from './utils/getSVGMousePosition';
import isLeftMouseButton from './utils/isLeftMouseButton';
import { MOUSEMOVE_THROTTLE_INTERVAL } from './constants/general';

import SVGCanvas from './components/SVGCanvas';
import ToolBar from './components/ToolBar';
import BaseHexGrid from './components/BaseHexGrid';
import MouseOverlays from './components/MouseOverlays';

class App extends React.PureComponent {
  static propTypes = {
    // objects: PropTypes.arrayOf(PropTypes.object),
    overlays: PropTypes.arrayOf(PropTypes.object),
    activeHexes: PropTypes.arrayOf(PropTypes.array),
    canvasData: PropTypes.object,

    mouseMove: PropTypes.func.isRequired,
    mouseDown: PropTypes.func.isRequired,
    mouseUp: PropTypes.func.isRequired,
    viewportRecalc: PropTypes.func.isRequired,
  };

  throttledTrackMouse = _.throttle(
    (position, svgPosition) => {
      this.props.mouseMove(position, svgPosition);
    },
    MOUSEMOVE_THROTTLE_INTERVAL
  );

  throttledOnViewportResize = _.throttle(
    () => {
      this.props.viewportRecalc();
    },
    MOUSEMOVE_THROTTLE_INTERVAL,
    { leading: false },
  );

  trackMouse = (event) => {
    this.throttledTrackMouse(getGlobalMousePosition(event), getSVGMousePosition(event));
  };

  onMouseDown = (event) => {
    if (isLeftMouseButton(event)) {
      this.props.mouseDown(getGlobalMousePosition(event), getSVGMousePosition(event));
    }
  };

  onMouseUp = (event) => {
    if (isLeftMouseButton(event)) {
      this.props.mouseUp(getGlobalMousePosition(event));
    }
  };

  componentWillMount = () => {
    window.addEventListener('resize', this.throttledOnViewportResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.throttledOnViewportResize);
  };

  render () {
    return (
      <div className="App">
        <Alert effect="slide" stack={true} position="top-left" />
        <SVGCanvas
          data={this.props.canvasData}
          trackMouse={this.trackMouse}
          onMouseDown={this.onMouseDown}
          onMouseUp={this.onMouseUp}
        >
          <BaseHexGrid activeHexes={this.props.activeHexes} />

          {/*TODO {this.props.objects}*/}

          <MouseOverlays overlays={this.props.overlays} />
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
  activeHexes: state.activeHexes,
});

const mapDispatchToProps = (dispatch) => ({
  mouseMove (position, svgPosition) { dispatch(mouseMove(position, svgPosition)); },
  mouseDown (position, svgPosition) { dispatch(mouseDown(position, svgPosition)); },
  mouseUp (position) { dispatch(mouseUp(position)); },
  viewportRecalc () { dispatch(viewportRecalc()); },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
