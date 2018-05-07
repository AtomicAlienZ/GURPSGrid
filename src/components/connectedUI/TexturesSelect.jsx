import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { connect } from 'react-redux';

import './TexturesSelect.scss';

import { getTextures } from '../../selectors/index';

function renderValue (value) {
  return (
    <div
      className="ui-texturesSelect__valueDisplay"
      style={{
        backgroundImage: `url(${value && value.preview})`,
      }}
    />
  );
}

function renderOption (value) {
  return (
    <div
      className="ui-texturesSelect__optionDisplay"
      style={{
        backgroundImage: `url(${value && value.preview})`,
      }}
    />
  );
}

class TexturesSelect extends React.PureComponent {
  static propTypes = {
    textures: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    onChange: PropTypes.func.isRequired,
    selectedId: PropTypes.string,
  };

  render () {
    return (
      <Select
        className="ui-texturesSelect"
        clearable={false}
        searchable={false}
        options={this.props.textures}
        labelKey="name"
        valueKey="id"
        value={this.props.selectedId}
        onChange={this.props.onChange}

        optionRenderer={renderOption}
        valueRenderer={renderValue}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  textures: getTextures(state),
});

export default connect(mapStateToProps)(TexturesSelect);
