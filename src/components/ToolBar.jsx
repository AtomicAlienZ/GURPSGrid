import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './ToolBar.scss';

import { TOOLS, TOOLS_DATA_MAP, TOOL_DEBUG, TOOL_CANVASCONFIG } from '../constants/tools';
import { centerCanvas, selectTool } from '../actions/index';

import AppDebug from './tools/debug/AppDebug';
import CanvasConfig from './tools/canvasConfig/CanvasConfig';

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
    let component = null;

    switch (this.props.activeTool) {
      case TOOL_DEBUG:
        component = <AppDebug />;
        break;
      case TOOL_CANVASCONFIG:
        component = <CanvasConfig />;
        break;
    }

    return component ? <div className="ToolBar__content">{component}</div> : null;
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
