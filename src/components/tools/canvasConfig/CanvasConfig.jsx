import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './CanvasConfig.scss';

import DrawType from './DrawType';

// actions
import { canvasConfigChangeProp } from '../../../actions/index';

class CanvasConfig extends React.PureComponent {
  static propTypes = {
    drawType: PropTypes.string,
    drawExclude: PropTypes.bool,

    changeCanvasConfigProp: PropTypes.func.isRequired,
  };

  render () {
    return (
      <div className="CanvasConfig">
        Active area

        <DrawType
          drawType={this.props.drawType}
          drawExclude={this.props.drawExclude}
          changeCanvasConfigProp={this.props.changeCanvasConfigProp}
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
