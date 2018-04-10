import React from 'react';
import PropTypes from 'prop-types';

import './TexturesItem.scss';

import { getFileSizeReadable } from '../../../utils/fileUtilities';
import Input from '../../ui/Input';

class TexturesItem extends React.PureComponent {
  static propTypes = {
    texture: PropTypes.object.isRequired,
    onNameChange: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
  };

  removeTexture = () => {
    this.props.onRemove(this.props.texture.id);
  };

  changeTextureName = (name) => {
    // console.log('>>>', name);
    this.props.onNameChange(this.props.texture.id, name);
  };

  render () {
    return (
      <div className="TexturesItem">
        <div
          className="TexturesItem__preview"
          style={{
            backgroundImage: `url(${this.props.texture.preview})`,
          }}
        />

        <div className="TexturesItem__data">
          <Input value={this.props.texture.name} onChange={this.changeTextureName} />

          <div className="TexturesItem__aux">{getFileSizeReadable(this.props.texture.size)}</div>
        </div>

        <div className="mdi mdi-close TexturesItem__remove" onClick={this.removeTexture} />
      </div>
    );
  }
}

export default TexturesItem;
