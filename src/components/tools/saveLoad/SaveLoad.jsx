import React from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'browser-filesaver';
import { connect } from 'react-redux';
import DropZone from 'react-dropzone';
import Alert from 'react-s-alert';

import './SaveLoad.scss';

import Input from '../../ui/Input';

import { STORAGE_FILE_DEFAULT_NAME, STORAGE_FILE_EXTENSION } from '../../../constants/stateStorage';
import { dehydrateState } from '../../../utils/stateStorageUtilities';
import { fileToPlainText } from '../../../utils/fileUtilities';

// actions
import { saveLoadApplyLoaded } from '../../../actions/index';

class SaveLoad extends React.PureComponent {
  static propTypes = {
    state: PropTypes.object.isRequired,
    saveLoadApplyLoaded: PropTypes.func,
  };

  // This component is stateful because we don't need to retain any data related to it
  // And this data won't be used anywhere else
  state = {
    filename: STORAGE_FILE_DEFAULT_NAME,
  };

  onChange = (filename) => {
    this.setState({ filename });
  };

  save = () => {
    FileSaver.saveAs(
      new Blob([dehydrateState(this.props.state)]),
      `${this.state.filename}.${STORAGE_FILE_EXTENSION}`
    );
  };

  load = (acceptedFiles, rejectedFiles) => {
    // We still use rejected files for cases when user load a valid file but with wrong extension
    acceptedFiles.concat(rejectedFiles).forEach((file) => {
      fileToPlainText(file)
        .then((data) => {
          try {
            this.props.saveLoadApplyLoaded(data);
            Alert.success('Loaded!');
          }
          catch (e) {
            console.error(e);
            Alert.error(`File seems to be corrupted: ${file.name}`);
          }
        });
    });
  };

  render () {
    return (
      <div className="SaveLoad">
        <h3>Load grid</h3>
        <DropZone accept={`.${STORAGE_FILE_EXTENSION}`} onDrop={this.load} />

        <hr />

        <h3>Save grid</h3>
        <Input
          onChangeTimeout={0}
          value={this.state.filename}
          onChange={this.onChange}
          className="SaveLoad__saveInput"
        />
        {' '}.{STORAGE_FILE_EXTENSION}
        <button className="btn SaveLoad__saveBtn" onClick={this.save}>Save</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => ({
  saveLoadApplyLoaded (subState) { dispatch(saveLoadApplyLoaded(subState)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveLoad);
