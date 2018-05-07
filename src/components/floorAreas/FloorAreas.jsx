import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getFloorAreas, getTextures, getAreaPathCached } from '../../selectors/index';

class FloorAreas extends React.PureComponent {
  static propTypes = {
    floorAreas: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    textures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  };

  render () {
    const texturesMap = this.props.textures.reduce(
      (acc, texture) => {
        acc[texture.id] = texture;
        return acc;
      },
      {}
    );

    return (
      <g>
        {this.props.floorAreas.map((area) => {
          const texture = texturesMap[area.textureId];
          return (
            <path
              key={area.id}
              d={getAreaPathCached(area.hexes)}
              className="SVGFloorArea"
              style={{
                fill: `url(#${texture && texture.id})`,
              }}
            />
          );
        })}
      </g>
    );
  }
}

const mapStateToProps = (state) => ({
  floorAreas: getFloorAreas(state),
  textures: getTextures(state),
});

export default connect(mapStateToProps)(FloorAreas);
