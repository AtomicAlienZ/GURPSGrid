import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CanvasConfig.scss';

import { DRAWTYPES } from '../../../constants/canvasConfig';

// actions
import { canvasConfigChangeProp } from '../../../actions/index';

class CanvasConfig extends React.PureComponent {
  static propTypes = {
    drawType: PropTypes.string,
    drawExclude: PropTypes.bool,

    changeCanvasConfigProp: PropTypes.func.isRequired,
  };

  getDrawTypeChanger = (type) => {
    return () => {
      this.props.changeCanvasConfigProp('drawType', type);
    };
  };

  turnExclusionOn = () => { this.props.changeCanvasConfigProp('drawExclude', true); };
  turnExclusionOff = () => { this.props.changeCanvasConfigProp('drawExclude', false); };

  render () {
    return (
      <div className="CanvasConfig">
        Draw<br />

        <div
          className={`btn mdi mdi-pencil-off ${!this.props.drawType && 'btn_active'}`}
          onClick={this.getDrawTypeChanger(null)}
        />

        {DRAWTYPES.map((type) => (
          <div
            key={type}
            className={`btn mdi mdi-${type} ${this.props.drawType === type && 'btn_active'}`}
            onClick={this.getDrawTypeChanger(type)}
          />
        ))}

        &nbsp; &nbsp;{' '}

        <div
          className={`btn mdi mdi-vector-union ${!this.props.drawExclude && 'btn_active'}`}
          onClick={this.turnExclusionOff}
        />
        <div
          className={`btn mdi mdi-vector-difference-ab ${this.props.drawExclude && 'btn_active'}`}
          onClick={this.turnExclusionOn}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ activeToolData }) => ({ ...activeToolData });

const mapDispatchToProps = (dispatch) => ({
  changeCanvasConfigProp (prop, value) { dispatch(canvasConfigChangeProp(prop, value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasConfig);
