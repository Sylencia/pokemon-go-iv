import React, { PropTypes } from 'react';
import '../assets/stylesheets/OutputRow.scss';

const OutputRow = (props) => {
  const percentage = parseFloat((props.stamina + props.attack + props.defense) / 45 * 100)
    .toFixed(2);
  const s = (props.stamina < 10 ? ' ' : '') + props.stamina;
  const a = (props.attack < 10 ? ' ' : '') + props.attack;
  const d = (props.defense < 10 ? ' ' : '') + props.defense;

  return (
    <tr>
      <th>{props.level}</th>
      <th>
        <div className="center">
          <i className="fa fa-heart" aria-hidden="true"></i> {s} &nbsp;
          <i className="fa fa-hand-rock-o" aria-hidden="true"></i> {a} &nbsp;
          <i className="fa fa-shield" aria-hidden="true"></i> {d}
        </div>
      </th>
      <th>{percentage}%</th>
      <th>{props.maxCP}</th>
    </tr>
  );
};

OutputRow.propTypes = {
  level: PropTypes.number.isRequired,
  stamina: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  maxCP: PropTypes.number.isRequired,
};

export default OutputRow;
