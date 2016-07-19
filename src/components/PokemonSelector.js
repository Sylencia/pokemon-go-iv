import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';

import Pokemon from '../assets/data/Pokemon.json';
import '../assets/stylesheets/PokemonSelector.scss';

function getSuggestions(value) {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : Pokemon.filter(pokemon =>
    pokemon.name.toLowerCase().slice(0, inputLength) === inputValue
  );
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

class PokemonSelector extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions(''),
    };

    this.onChange = this.onChange.bind(this);
    this.onSuggestionsUpdateRequested =
      this.onSuggestionsUpdateRequested.bind(this);
  }

  onChange(e, { newValue }) {
    this.setState({
      value: newValue,
    });
  }

  onSuggestionsUpdateRequested({ value }) {
    this.setState({
      suggestions: getSuggestions(value),
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Begin searching for a Pokemon',
      value,
      onChange: this.onChange,
    };

    return (
      <div className="columns">
        <div className="column col-4" />
        <Autosuggest suggestions={suggestions}
          onSuggestionsUpdateRequested={this.onSuggestionsUpdateRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps} />
        <div className="column col-4" />
      </div>
    );
  }
}

export default PokemonSelector;
