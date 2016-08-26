import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import '~/assets/stylesheets/Input.scss';
import '~/assets/stylesheets/Utility.scss';
import PokemonSelection from '~/components/PokemonSelection';
import * as Helper from '~/components/Helper/HelperFunctions';

class MinmaxInput extends Component {
  static propTypes = {
    onNameChangeCB: PropTypes.func.isRequired,
    onLevelChangeCB: PropTypes.func.isRequired,
    onWildChangeCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    const level = localStorage.getItem('trainerLevel') || '';

    this.state = {
      name: '',
      validPokemon: '',
      level,
      validLevel: 0,
      wild: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  onLevelChange(e) {
    const level = e.target.value;
    if (Helper.validateNumericEntry(level)) {
      localStorage.setItem('trainerLevel', e.target.value);

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

    if (Helper.validatePokemonEntry(name)) {
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

  handleFocus(e) {
    e.target.select();
  }

  render() {
    const { name, level } = this.state;

    const validPokemon = Helper.validatePokemonEntry(name);
    const validLevel = Helper.validateNumericEntry(level);
    const nameStatus = Helper.getValidityIcon(validPokemon);
    const levelStatus = Helper.getValidityIcon(validLevel);
    const pokemonList = Helper.getPokemonList();

    // hacky since i don't want div or span to wreck my styling
    let nameElement = '';
    let dataList = '';

    if (Modernizr.datalistelem) {
      nameElement = (
        <input onChange={this.onNameChange} className="form-input input-lg"
          onFocus={this.handleFocus}
          onMouseUp={(e) => {e.preventDefault();}}
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
          <input onChange={this.onLevelChange} className="form-input input-lg" type="number"
            onFocus={this.handleFocus} pattern="[0-9]*"
            onMouseUp={(e) => {e.preventDefault();}} value={level}></input>
          <span className="input-group-addon addon-lg right-addon">{levelStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">pokémon</span>
          {nameElement}
          {dataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="new-section">
          <div className="checkbox-item">
            <label className="form-switch">
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
