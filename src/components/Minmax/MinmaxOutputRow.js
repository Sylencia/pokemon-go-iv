import React, { PropTypes } from 'react';
import '~/assets/stylesheets/IVFinder/OutputRow.scss';
import '~/assets/stylesheets/utility.scss';

const MinmaxOutputRow = (props) => (
  <tr>
    <th>{props.level}</th>
    <th><div className="text-center">{props.dust}</div></th>
    <th><div className="text-center">{props.minCP}cp / {props.minHP}hp</div></th>
    <th><div className="text-center">{props.maxCP}cp / {props.maxHP}hp</div></th>
  </tr>
);

MinmaxOutputRow.propTypes = {
  level: PropTypes.number.isRequired,
  dust: PropTypes.number.isRequired,
  minCP: PropTypes.number.isRequired,
  maxCP: PropTypes.number.isRequired,
  minHP: PropTypes.number.isRequired,
  maxHP: PropTypes.number.isRequired,
};

export default MinmaxOutputRow;
