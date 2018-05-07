import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { DRAWTYPES } from '../config/drawTypes';

// actions
import { drawSetType, drawSetExclude } from '../actions/index';

class DrawType extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    exclude: PropTypes.bool,

    drawSetType: PropTypes.func.isRequired,
    drawSetExclude: PropTypes.func.isRequired,
  };

  getDrawTypeChanger = (type) => {
    return () => {
      this.props.drawSetType(type);
    };
  };

  turnExclusionOn = () => { this.props.drawSetExclude(true); };
  turnExclusionOff = () => { this.props.drawSetExclude(false); };

  render () {
    return (
      <div>
        <div
          className={`btn mdi mdi-pencil-off ${!this.props.type && 'btn_active'}`}
          onClick={this.getDrawTypeChanger(null)}
        />

        {DRAWTYPES.map((type) => (
          <div
            key={type}
            className={`btn mdi mdi-${type} ${this.props.type === type && 'btn_active'}`}
            onClick={this.getDrawTypeChanger(type)}
          />
        ))}

        &nbsp; &nbsp;{' '}

        <div
          className={`btn mdi mdi-vector-union ${!this.props.exclude && 'btn_active'}`}
          onClick={this.turnExclusionOff}
        />
        <div
          className={`btn mdi mdi-vector-difference-ab ${this.props.exclude && 'btn_active'}`}
          onClick={this.turnExclusionOn}
        />
      </div>
    );
  }
}

const mapStateToProps = ({ draw }) => ({ ...draw });

const mapDispatchToProps = (dispatch) => ({
  drawSetType (value) { dispatch(drawSetType(value)); },
  drawSetExclude (value) { dispatch(drawSetExclude(value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawType);
