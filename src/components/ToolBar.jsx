import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './ToolBar.scss';

import {
  TOOLS,
  TOOLS_DATA_MAP,
} from '../config/tools';
import { centerCanvas, selectTool } from '../actions/index';

class ToolBar extends React.PureComponent {
  static propTypes = {
    activeTool: PropTypes.string,

    centerCanvas: PropTypes.func.isRequired,
    selectTool: PropTypes.func.isRequired,
  };

  getToolClickHandler = (tool) => {
    return () => {
      this.props.selectTool(tool);
    };
  };

  renderActiveTool = () => {
    let Component = TOOLS_DATA_MAP[this.props.activeTool] && TOOLS_DATA_MAP[this.props.activeTool].component;

    return Component ? <div className="ToolBar__content"><Component /></div> : null;
  };

  render () {
    return (
      <div className="ToolBar">
        <div className="ToolBar__buttons">
          <div
            className="btn ToolButton mdi mdi-image-filter-center-focus"
            title="Center Canvas"
            onClick={this.props.centerCanvas}
          />

          {TOOLS.map((toolName) => (
            <div
              key={`toolToggle-${toolName}`}
              className={`btn ${this.props.activeTool === toolName && 'btn_active'} ToolButton mdi mdi-${TOOLS_DATA_MAP[toolName].icon}`}
              title={TOOLS_DATA_MAP[toolName].name}
              onClick={this.getToolClickHandler(toolName)}
            />
          ))}
        </div>

        {this.renderActiveTool()}
      </div>
    );
  }
}

const mapStateToProps = ({ activeTool }) => ({ activeTool });

const mapDispatchToProps = (dispatch) => ({
  centerCanvas () { dispatch(centerCanvas()); },
  selectTool (toolName) { dispatch(selectTool(toolName)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
