import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import '~/assets/stylesheets/Input.scss';
import '~/assets/stylesheets/Utility.scss';
import PokemonSelection from '~/components/PokemonSelection';
import * as Helper from '~/components/Helper/HelperFunctions';

class MultiInput extends Component {
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
      cp: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
  }

  onCPChange(e) {
    this.setState({
      cp: e.target.value,
    });
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

  render() {
    const { name, cp } = this.state;

    const validPokemon = Helper.validatePokemonEntry(name);
    const nameStatus = Helper.getValidityIcon(validPokemon);
    const pokemonList = Helper.getPokemonList();

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
          <span className="input-group-addon addon-lg left-addon-wide">group size</span>
          <input className="form-input input-lg"></input>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">name</span>
          {nameElement}
          {dataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="input-group">
          <input onChange={this.onCPChange} className="form-input input-lg multi-input-lg"
            value={cp} placeholder="cp"></input>
          <input onChange={this.onCPChange} className="form-input input-lg multi-input-lg"
            value={cp} placeholder="hp"></input>
          <input onChange={this.onCPChange} className="form-input input-lg multi-input-lg"
            value={cp} placeholder="dust"></input>
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
      </div>
    );
  }
}

export default MultiInput;
