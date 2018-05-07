import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import './FloorAreas.scss';

import { getFloorAreas, getTextures, getActiveToolData } from '../../../selectors/index';
import {
  floorAreasAdd,
  floorAreasSelect,
  floorAreasDelete,
  floorAreasEdit,
  floorAreasUpdate,
  floorAreasMove,
} from '../../../actions/index';

import FloorArea from './FloorArea';

const DEFAULT_NAME = 'Unnamed area';

class FloorAreas extends React.PureComponent {
  static propTypes = {
    floorAreas: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    textures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    selectedAreaId: PropTypes.string,
    editedAreaId: PropTypes.string,

    floorAreasAdd: PropTypes.func.isRequired,
    floorAreasSelect: PropTypes.func.isRequired,
    floorAreasDelete: PropTypes.func.isRequired,
    floorAreasEdit: PropTypes.func.isRequired,
    floorAreasUpdate: PropTypes.func.isRequired,
    floorAreasMove: PropTypes.func.isRequired,
  };

  deleteArea = (id) => {
    this.props.floorAreasDelete(id);
  };

  selectArea = (id) => {
    this.props.floorAreasSelect(id);
  };

  editArea = (id) => {
    this.props.floorAreasEdit(id);
  };

  editCancel = () => {
    this.props.floorAreasEdit(null);
  };

  saveChanges = (area) => {
    this.props.floorAreasUpdate(area);
  };

  changeOrder = (id, moveUp) => {
    this.props.floorAreasMove(id, moveUp);
  };

  renderArea = (area) => (
    <FloorArea
      textures={this.props.textures}
      isSelected={this.props.selectedAreaId === area.id}
      isEdited={this.props.editedAreaId === area.id}
      key={area.id}
      area={area}
      onDelete={this.deleteArea}
      onClick={this.selectArea}
      onEdit={this.editArea}
      onEditCancel={this.editCancel}
      saveChanges={this.saveChanges}
      changeOrder={this.changeOrder}
    />
  );

  addTexture = () => {
    this.props.floorAreasAdd(DEFAULT_NAME);
  };

  render () {
    return (
      <div className="FloorAreas">
        <h3>Floor areas</h3>

        <button className="btn" onClick={this.addTexture}>
          <span className="mdi mdi-plus-outline" />&nbsp; New Area
        </button>

        <div>
          {this.props.floorAreas.slice(0).reverse().map(this.renderArea)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  floorAreas: getFloorAreas(state),
  textures: getTextures(state),
  ...getActiveToolData(state),
});

const mapDispatchToProps = (dispatch) => ({
  floorAreasAdd (name, textureId = null) { dispatch(floorAreasAdd({ name, textureId })); },
  floorAreasSelect (id) { dispatch(floorAreasSelect(id)); },
  floorAreasDelete (id) { dispatch(floorAreasDelete(id)); },
  floorAreasEdit (id) { dispatch(floorAreasEdit(id)); },
  floorAreasUpdate (payload) { dispatch(floorAreasUpdate(payload)); },
  floorAreasMove (id, moveUp) { dispatch(floorAreasMove(id, moveUp)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(FloorAreas);
