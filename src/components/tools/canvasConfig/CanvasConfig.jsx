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

    changeCanvasConfigProp: PropTypes.func.isRequired,
  };

  getDrawTypeChanger = (type) => {
    return () => {
      this.props.changeCanvasConfigProp('drawType', type);
    };
  };

  render () {
    return (
      <div className="CanvasConfig">
        Draw &nbsp; &nbsp;

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

        {/*<hr />*/}

        {/*<strong>drawPrevCol:</strong> {this.props.drawPrevCol}<br />*/}
        {/*<strong>drawPrevRow:</strong> {this.props.drawPrevRow}<br />*/}
        {/*<strong>startCol:</strong> {this.props.startCol}<br />*/}
        {/*<strong>startRow:</strong> {this.props.startRow}*/}
      </div>
    );
  }
}

const mapStateToProps = ({ activeToolData }) => ({ ...activeToolData });

const mapDispatchToProps = (dispatch) => ({
  changeCanvasConfigProp (prop, value) { dispatch(canvasConfigChangeProp(prop, value)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(CanvasConfig);
