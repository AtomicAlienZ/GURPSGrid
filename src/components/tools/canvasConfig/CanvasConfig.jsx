import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// actions
import { canvasConfigChangeProp } from '../../../actions/index';

class CanvasConfig extends React.PureComponent {
  static propTypes = {
    drawActive: PropTypes.bool.isRequired,

    changeCanvasConfigProp: PropTypes.func.isRequired,
  };

  toggleDraw = () => {
    this.props.changeCanvasConfigProp('drawActive', !this.props.drawActive);
  };

  render () {
    return (
      <div className="CanvasConfig">
        <div className={`btn ${this.props.drawActive && 'btn_active'}`} onClick={this.toggleDraw}>
          Draw
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ activeToolData }) => ({ ...activeToolData });

const mapDispatchToProps = (dispatch) => ({
  changeCanvasConfigProp (prop, value) { dispatch(canvasConfigChangeProp(prop, value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasConfig);
