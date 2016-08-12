import React, { PropTypes } from 'react';
import '~/assets/stylesheets/OutputRow.scss';
import '~/assets/stylesheets/Utility.scss';

const FinderOutputRow = (props) => {
  const s = (props.stamina < 10 ? ' ' : '') + props.stamina;
  const a = (props.attack < 10 ? ' ' : '') + props.attack;
  const d = (props.defense < 10 ? ' ' : '') + props.defense;
  const ap = parseFloat(props.atkPercent).toFixed(0);
  const dp = parseFloat(props.defPercent).toFixed(0);
  const p = parseFloat(props.perfection).toFixed(0);

  return (
    <tr>
      <th>{props.level} ({props.altLevel})</th>
      <th>
        <div className="text-center">
          <span className="item"><i className="fa fa-heart" aria-hidden="true"></i> {s}</span>
          <span className="item">
            <i className="fa fa-hand-rock-o" aria-hidden="true"></i> {a}
          </span>
          <span className="item"><i className="fa fa-shield" aria-hidden="true"></i> {d}</span>
        </div>
      </th>
      <th><div className="text-center">
        {p}%
      </div></th>
      <th><div className="text-center">
        <i className="fa fa-hand-rock-o" aria-hidden="true"></i> {ap}%<br />
        <i className="fa fa-shield" aria-hidden="true"></i> {dp}%
      </div></th>
    </tr>
  );
};

FinderOutputRow.propTypes = {
  level: PropTypes.number.isRequired,
  altLevel: PropTypes.number.isRequired,
  stamina: PropTypes.number.isRequired,
  attack: PropTypes.number.isRequired,
  defense: PropTypes.number.isRequired,
  atkPercent: PropTypes.number.isRequired,
  defPercent: PropTypes.number.isRequired,
  perfection: PropTypes.number.isRequired,
};

export default FinderOutputRow;
