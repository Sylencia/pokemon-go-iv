import React, { PropTypes } from 'react';

const DustSelection = (props) => (
  <option>{props.dust}</option>
);

DustSelection.propTypes = {
  dust: PropTypes.number.isRequired,
};

export default DustSelection;
