import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import Alert from 'react-s-alert';

import './Textures.scss';

import { MAX_TEXTURE_SIZE } from '../../../constants/general';
import { getFileSizeReadable, fileToBase64 } from '../../../utils/fileUtilities';

import TexturesItem from './TexturesItem';

// actions
import { texturesAdd, texturesRemove, texturesRename } from '../../../actions/index';

class Textures extends React.PureComponent {
  static propTypes = {
    textures: PropTypes.array,

    texturesAdd: PropTypes.func.isRequired,
    texturesRemove: PropTypes.func.isRequired,
    texturesRename: PropTypes.func.isRequired,
  };

  addTexture = (acceptedFiles, rejectedFiles) => {
    acceptedFiles.forEach((file) => {
      fileToBase64(file)
        .then((dataUrl) => {
          this.props.texturesAdd(file, dataUrl);
          Alert.success(`Loaded ${file.name}`);
        })
        .catch((reason) => {
          Alert.error(`Rejected ${name}: ${reason}`);
        });
    });

    rejectedFiles.forEach(({ name, size }) => {
      let reason = size <= MAX_TEXTURE_SIZE ? 'not an image' : 'file too big';
      Alert.error(`Rejected ${name}: ${reason}`);
    });
  };

  render () {
    return (
      <div className="Textures">
        <h4>Textures</h4>

        <DropZone
          className="Textures__dropzone"
          onDrop={this.addTexture}
          accept="image/*"
          maxSize={MAX_TEXTURE_SIZE}
        >
          Add a texture (max {getFileSizeReadable(MAX_TEXTURE_SIZE)})
        </DropZone>

        {this.props.textures.length > 0 && <h5>Textures:</h5>}

        {this.props.textures.map((texture) => (
          <TexturesItem
            key={texture.id}
            texture={texture}
            onNameChange={this.props.texturesRename}
            onRemove={this.props.texturesRemove}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ textures }) => ({ textures });

const mapDispatchToProps = (dispatch) => ({
  texturesAdd (file, dataUrl) { dispatch(texturesAdd(file, dataUrl)); },
  texturesRemove (id) { dispatch(texturesRemove(id)); },
  texturesRename (id, name) { dispatch(texturesRename(id, name)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Textures);
