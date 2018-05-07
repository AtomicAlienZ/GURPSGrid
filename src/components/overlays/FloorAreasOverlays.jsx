import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './FloorAreasOverlays.scss';

import { getCurrentFloorAreaPath } from '../../selectors/index';

class FloorAreasOverlays extends React.PureComponent {
  static propTypes = {
    path: PropTypes.string,
  };

  render () {
    if (this.props.path) {
      return <path d={this.props.path} className="FloorAreasOverlay" />;
    }

    return null;
  }
}

const mapStateToProps = (state, props) => ({
  path: getCurrentFloorAreaPath(state, props),
});

export default connect(mapStateToProps)(FloorAreasOverlays);
