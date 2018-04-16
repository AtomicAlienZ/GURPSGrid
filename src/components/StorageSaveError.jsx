import React from 'react';
import PropTypes from 'prop-types';

import './StorageSaveError.scss';

class StorageSaveError extends React.PureComponent {
  static propTypes = {
    storageSaveError: PropTypes.string,
  };

  render () {
    let title = this.props.storageSaveError;

    switch (title) {
      case 'QuotaExceededError':
      case 'NS_ERROR_DOM_QUOTA_REACHED':
        title = 'Grid is too big to be saved automatically. Please use file export.';
        break;
    }

    if (!title) {
      return null;
    }

    return (
      <div className="mdi mdi-alert-circle StorageSaveError" title={title} />
    );
  }
}

export default StorageSaveError;
