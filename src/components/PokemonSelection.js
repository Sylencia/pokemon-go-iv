import React, { PropTypes } from 'react';

const PokemonSelection = (props) => (
  <option>{props.name}</option>
);

PokemonSelection.propTypes = {
  name: PropTypes.string.isRequired,
};

export default PokemonSelection;
