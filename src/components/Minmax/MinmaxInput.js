import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import '~/assets/stylesheets/IVFinder/Input.scss';
import '~/assets/stylesheets/utility.scss';
import Pokemon from '~/assets/data/Pokemon.json';
import PokemonSelection from '~/components/PokemonSelection';

function validatePokemonEntry(entry) {
  if (entry === '') {
    return false;
  }

  const pkmn = Pokemon.find((pokemon) =>
    (pokemon.name.toLowerCase().trim() === entry.toLowerCase().trim()));
  return pkmn !== null && pkmn !== undefined;
}

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number) && number > 0;
}

function getValidityIcon(success) {
  if (success) {
    return <i className="fa fa-check" aria-hidden="true"></i>;
  }

  return <i className="fa fa-times" aria-hidden="true"></i>;
}

function getPokemonList() {
  return Pokemon.map((p) => (p.name)).sort();
}

class MinmaxInput extends Component {
  static propTypes = {
    onNameChangeCB: PropTypes.func.isRequired,
    onLevelChangeCB: PropTypes.func.isRequired,
    onWildChangeCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      validPokemon: '',
      level: '',
      validLevel: 0,
      wild: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
  }

  onLevelChange(e) {
    const level = e.target.value;
    if (validateNumericEntry(level)) {
      this.props.onLevelChangeCB(Number(level));
      this.setState({
        level,
        validLevel: Number(level),
      });
    } else {
      this.setState({
        level,
      });
    }
  }

  onNameChange(e) {
    const name = e.target.value;

    if (validatePokemonEntry(name)) {
      this.props.onNameChangeCB(name.toLowerCase());
      this.setState({
        name,
        validName: name.toLowerCase(),
      });
    } else {
      this.setState({
        name,
      });
    }
  }

  onWildChange(e) {
    this.props.onWildChangeCB(e.target.checked);

    this.setState({
      wild: e.target.checked,
    });
  }

  render() {
    const { name, level } = this.state;

    const validPokemon = validatePokemonEntry(name);
    const validLevel = validateNumericEntry(level);
    const nameStatus = getValidityIcon(validPokemon);
    const levelStatus = getValidityIcon(validLevel);
    const pokemonList = getPokemonList();

    // hacky since i don't want div or span to wreck my styling
    let nameElement = '';
    let dataList = '';

    if (Modernizr.datalistelem) {
      nameElement = (
        <input onChange={this.onNameChange} className="form-input input-lg"
          value={name} type="text" list="pokemon"></input>);
      dataList = (
        <datalist id="pokemon">
        {pokemonList.map((pokemon) => (
          <PokemonSelection name={pokemon} key={pokemon} />
        ))}
      </datalist>);
    } else {
      nameElement = (
        <select className="form-select select-lg selector" onChange={this.onNameChange}
          value={name}>
         <option value="" disabled></option>
           {pokemonList.map((pokemon) => (
             <PokemonSelection name={pokemon} key={pokemon} />
           ))}
       </select>
     );
    }

    return (
      <div className="section">
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">trainer lv</span>
          <input onChange={this.onLevelChange} className="form-input input-lg"
            value={level}></input>
          <span className="input-group-addon addon-lg right-addon">{levelStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">name</span>
          {nameElement}
          {dataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="new-section">
          <div className="checkbox-item">
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onWildChange} checked={this.state.wild} />
              <i className="form-icon"></i>
              <span className="checkbox-text">untrained wild</span>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default MinmaxInput;
