import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './MouseOverlays.scss';

import { OVERLAYS_COMPONENTS_MAP } from '../../config/mouseOverlays';

class MouseOverlays extends React.PureComponent {
  static propTypes = {
    overlays: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  renderOverlay = (overlayData) => {
    const Component = OVERLAYS_COMPONENTS_MAP[overlayData.type];

    if (Component) {
      return <Component key={overlayData.id} {...overlayData} />;
    }

    return null;
  };

  render () {
    return this.props.overlays.map(this.renderOverlay);
  }
}

const mapStateToProps = ({ overlays }) => ({ overlays });

export default connect(mapStateToProps)(MouseOverlays);
