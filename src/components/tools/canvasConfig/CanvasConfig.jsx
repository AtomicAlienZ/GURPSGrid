import React from 'react';

import './CanvasConfig.scss';

import DrawType from './DrawType';

class CanvasConfig extends React.PureComponent {
  static propTypes = {};

  render () {
    return (
      <div className="CanvasConfig">
        <h4>Draw</h4>

        <DrawType />
      </div>
    );
  }
}

export default CanvasConfig;
