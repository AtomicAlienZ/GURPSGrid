import React from 'react';
import PropTypes from 'prop-types';

import { getHexLine } from '../../../utils/hexMath';
import { getAreaOutlinePath } from '../../../utils/hexDraw';
import { hexArrayToMap } from '../../../utils/hexStructures';

class LineOverlay extends React.PureComponent {
  static propTypes = {
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    toCol: PropTypes.number,
    toRow: PropTypes.number,
    classMod: PropTypes.string,
  };

  render () {
    const from = {col: this.props.col, row: this.props.row};
    const to = {
      col: this.props.toCol === null ? this.props.col : this.props.toCol,
      row: this.props.toRow === null ? this.props.row : this.props.toRow,
    };
    const outline = getAreaOutlinePath(hexArrayToMap(getHexLine(from, to)));

    return (
      <g className="MouseOverlay">
        <path d={outline} className={`MouseOverlay__bg MouseOverlay__bg_${this.props.classMod}`} />
      </g>
    );
  }
}

export default LineOverlay;
