import { connect } from 'react-redux';

import App from '../App';

import { mouseMove, mouseUp, mouseDown } from '../actions/index';

const mapStateToProps = (state) => ({
  objects: state.objects,
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
