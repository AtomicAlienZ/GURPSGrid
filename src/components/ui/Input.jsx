import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'underscore';

import './Input.scss';

import { INPUT_SAVE_TIMEOUT } from '../../constants/general';

class Input extends React.PureComponent {
  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.string,
    onChangeTimeout: PropTypes.number,
    onChange: PropTypes.func,
    className: PropTypes.string,
    preprocessValue: PropTypes.func,
  };

  static defaultProps = {
    type: 'text',
    value: '',
    onChangeTimeout: INPUT_SAVE_TIMEOUT,
    onChange: (/*value*/) => {},
    className: '',
    preprocessValue: (value) => {
      return value.trim().replace(/\s+/gi, ' ');
    },
  };

  state = {
    value: this.props.value,
  };

  debouncedSave = null;

  propsToInternalState = ({ value, onChangeTimeout }) => {
    this.setState({ value });

    if (onChangeTimeout !== this.props.onChangeTimeout || !this.debouncedSave) {
      this.debouncedSave = debounce(this.props.onChange, this.props.onChangeTimeout);
    }
  };

  componentWillMount = () => {
    this.propsToInternalState(this.props);
  };

  componentWillReceiveProps = (newProps) => {
    this.propsToInternalState(newProps);
  };

  onChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
    this.debouncedSave(this.props.preprocessValue(value));
  };

  render () {
    return (
      <input
        className={`ui-input ${this.props.className}`}
        type={this.props.type}
        value={this.state.value}
        onChange={this.onChange}
      />
    );
  }
}

export default Input;
