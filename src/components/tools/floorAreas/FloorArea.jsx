import React from 'react';
import PropTypes from 'prop-types';

import './FloorArea.scss';

import DrawType from '../../DrawType';
import TexturesSelect from '../../connectedUI/TexturesSelect';
import Input from '../../ui/Input';

class FloorArea extends React.PureComponent {
  static propTypes = {
    area: PropTypes.object.isRequired,
    textures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    isEdited: PropTypes.bool,
    isSelected: PropTypes.bool,

    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onEditCancel: PropTypes.func.isRequired,
    saveChanges: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isEdited: false,
    isSelected: false,
  };

  onEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onEdit(this.props.area.id);
  };

  onEditCancel = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onEditCancel(this.props.area.id);
  };

  onDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onDelete(this.props.area.id);
  };

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClick(this.props.area.id);
  };

  onTextureChange = (value) => {
    this.props.saveChanges({
      id: this.props.area.id,
      textureId: value && value.id,
    });
  };

  onNameChange = (value) => {
    this.props.saveChanges({
      id: this.props.area.id,
      name: value,
    });
  };

  moveUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.changeOrder(this.props.area.id, true);
  };

  moveDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.changeOrder(this.props.area.id, false);
  };

  renderControls = () => {
    return (
      <div>
        {this.props.isEdited
        && <div className="mdi mdi-check FloorArea__control FloorArea__finishEdit" onClick={this.onEditCancel} />}

        {!this.props.isEdited
        && <div className="mdi mdi-pencil FloorArea__control FloorArea__edit" onClick={this.onEdit} />}

        {!this.props.isEdited
        && <div className="mdi mdi-window-close FloorArea__control FloorArea__remove" onClick={this.onDelete} />}

        <div className="mdi mdi-arrow-up FloorArea__control FloorArea__move" onClick={this.moveUp} />
        <div className="mdi mdi-arrow-down FloorArea__control FloorArea__move" onClick={this.moveDown} />
      </div>
    );
  };

  renderTexture = () => {
    const { textureId } = this.props.area;
    const texture = textureId && this.props.textures.find(({ id }) => id === textureId);

    if (this.props.isEdited) {
      return <TexturesSelect onChange={this.onTextureChange} selectedId={textureId} />;
    }

    return (
      <div className="FloorArea__textureContainer" style={{ backgroundImage: `url(${texture && texture.preview})` }} />
    );
  };

  renderData () {
    if (this.props.isEdited) {
      return (
        <Input
          onChange={this.onNameChange}
          value={this.props.area.name}
        />
      );
    }

    return <strong>{this.props.area.name}</strong>;
  }

  render () {
    return (
      <div
        className={`FloorArea ${this.props.isSelected && 'FloorArea_selected'} ${this.props.isEdited && 'FloorArea_edited'}`}
        onClick={this.onClick}
      >
        {this.props.isEdited && (
          <div className="FloorArea__drawtype">
            Draw:
            <DrawType />
          </div>
        )}

        <div className="FloorArea__texture">
          {this.renderTexture()}
        </div>

        <div className="FloorArea__data">
          {this.renderData()}
        </div>

        <div className="FloorArea__controls">
          {this.renderControls()}
        </div>
      </div>
    );
  }
}

export default FloorArea;
