import React, { Component, PropTypes } from 'react';

const OutputRow = (props) => (
  <tr>
    <th>{props.level}</th>
    <th>{props.stamina}</th>
    <th>{props.attack}</th>
    <th>{props.defense}</th>
    <th>test</th>
  </tr>
);

OutputRow.propTypes = {
  level: PropTypes.number.isRequired,
  stamina: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
};

export default OutputRow;
