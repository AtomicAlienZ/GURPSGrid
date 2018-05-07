import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getTextures } from '../selectors/index';

class Defs extends React.PureComponent {
  static propTypes = {
    textures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  renderTexturesPattern = (texture) => {
    return (
      <pattern
        key={texture.id}
        id={texture.id}
        patternUnits="userSpaceOnUse"
        width="100"
        height="100"
      >
        <image
          xlinkHref={texture.preview}
          x="0"
          y="0"
          width="100"
          height="100"
        />
      </pattern>
    );
  };

  render () {
    return (
      <defs>

        {/* Textures patterns */}
        {this.props.textures.map(this.renderTexturesPattern)}
      </defs>
    );
  }
}

const mapStateToProps = (state) => ({
  textures: getTextures(state),
});

export default connect(mapStateToProps)(Defs);
