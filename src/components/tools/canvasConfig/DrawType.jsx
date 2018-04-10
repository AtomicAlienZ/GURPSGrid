import React from 'react';
import PropTypes from 'prop-types';

import { DRAWTYPES } from '../../../constants/canvasConfig';

class DrawType extends React.PureComponent {
  static propTypes = {
    drawType: PropTypes.string,
    drawExclude: PropTypes.bool,
    // drawFloorTiles: PropTypes.bool,

    changeCanvasConfigProp: PropTypes.func.isRequired,
  };

  getDrawTypeChanger = (type) => {
    return () => {
      this.props.changeCanvasConfigProp('drawType', type);
    };
  };

  turnExclusionOn = () => { this.props.changeCanvasConfigProp('drawExclude', true); };
  turnExclusionOff = () => { this.props.changeCanvasConfigProp('drawExclude', false); };

  turnDrawFloorOn = () => { this.props.changeCanvasConfigProp('drawFloorTiles', true); };
  turnDrawFloorOff = () => { this.props.changeCanvasConfigProp('drawFloorTiles', false); };

  render () {
    return (
      <div>
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

        {/*&nbsp; &nbsp;{' '}*/}

        {/*<div*/}
          {/*className={`btn mdi mdi-hexagon ${!this.props.drawFloorTiles && 'btn_active'}`}*/}
          {/*onClick={this.turnDrawFloorOff}*/}
        {/*/>*/}
        {/*<div*/}
          {/*className={`btn mdi mdi-chart-scatterplot-hexbin ${this.props.drawFloorTiles && 'btn_active'}`}*/}
          {/*onClick={this.turnDrawFloorOn}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default DrawType;
