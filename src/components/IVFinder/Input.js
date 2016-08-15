import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import '~/assets/stylesheets/Input.scss';
import '~/assets/stylesheets/Utility.scss';
import PokemonSelection from '~/components/PokemonSelection';
import DustSelection from '~/components/DustSelection';
import * as Helper from '~/components/Helper/HelperFunctions';

class Input extends Component {
  static propTypes = {
    onInputSubmitCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      trainerLevel: '',
      name: '',
      cp: '',
      hp: '',
      dust: '',
      isNewSearch: true,
      wild: true,
      filterSearch: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onNewSearchSubmit = this.onNewSearchSubmit.bind(this);
    this.onFilterSubmit = this.onFilterSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
    this.onTrainerChange = this.onTrainerChange.bind(this);

    this.pokemonList = Helper.getPokemonList();
    this.dustList = Helper.getDustList();
  }

  onReset() {
    this.setState({
      name: '',
      cp: '',
      hp: '',
      dust: '',
      wild: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log('onsubmit');

    const { trainerLevel, name, cp, hp, dust } = this.state;

    const validTrainerLevel = Helper.validateLevelEntry(trainerLevel);
    const validPokemon = Helper.validatePokemonEntry(name);
    const validCP = Helper.validateNumericEntry(cp);
    const validHP = Helper.validateNumericEntry(hp);
    const validDust = Helper.validateDustEntry(dust);
    const valid = validPokemon && validCP && validDust && validHP && validTrainerLevel;

    this.onNewSearchSubmit(valid);
  }

  onNewSearchSubmit(valid) {
    const { trainerLevel, name, cp, hp, dust, wild } = this.state;

    if (valid) {
      this.props.onInputSubmitCB(Number(trainerLevel), name.toLowerCase(), Number(cp), Number(hp),
        Number(dust), wild, true);

      this.setState({
        isNewSearch: false,
      });
    }
  }

  onFilterSubmit(valid) {
    const { trainerLevel, name, cp, hp, dust } = this.state;
    console.log('onFilterSubmit');

    if (valid) {
      this.props.onInputSubmitCB(Number(trainerLevel), name.toLowerCase(), Number(cp), Number(hp),
        Number(dust), false, false);
    }
  }

  onNameChange(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onCPChange(e) {
    this.setState({
      cp: e.target.value,
    });
  }

  onHPChange(e) {
    this.setState({
      hp: e.target.value,
    });
  }

  onDustChange(e) {
    this.setState({
      dust: e.target.value,
    });
  }

  onWildChange(e) {
    this.setState({
      wild: e.target.checked,
    });
  }

  onTrainerChange(e) {
    this.setState({
      trainerLevel: e.target.value,
    });
  }

  render() {
    const { trainerLevel, name, cp, hp, dust, isNewSearch } = this.state;
    const { pokemonList, dustList } = this;

    const validTrainerLevel = Helper.validateLevelEntry(trainerLevel);
    const validPokemon = Helper.validatePokemonEntry(name);
    const validCP = Helper.validateNumericEntry(cp);
    const validHP = Helper.validateNumericEntry(hp);
    const validDust = Helper.validateDustEntry(dust);
    const valid = validPokemon && validCP && validDust && validHP && validTrainerLevel;

    const trainerStatus = Helper.getValidityIcon(validTrainerLevel);
    const nameStatus = Helper.getValidityIcon(validPokemon);
    const cpStatus = Helper.getValidityIcon(validCP);
    const hpStatus = Helper.getValidityIcon(validHP);
    const dustStatus = Helper.getValidityIcon(validDust);

    const filterButton = !isNewSearch ? (
      <button type="button" className="btn btn-primary btn-lrg button-item"
        onClick={() => (this.onFilterSubmit(valid))}>
        <i className="fa fa-search" aria-hidden="true"></i> same
      </button>
    ) : '';

    // hacky since i don't want div or span to wreck my styling
    let nameElement = '';
    let nameDataList = '';
    let dustElement = '';
    let dustDataList = '';

    if (Modernizr.datalistelem) {
      nameElement = (
        <input onChange={this.onNameChange} className="form-input input-lg"
          value={name} type="text" list="pokemon"></input>);
      nameDataList = (
        <datalist id="pokemon">
        {pokemonList.map((pokemon) => (
          <PokemonSelection name={pokemon} key={pokemon} />
        ))}
      </datalist>);

      dustElement = (
        <input onChange={this.onDustChange} className="form-input input-lg"
          value={dust} type="text" list="dust"></input>);
      dustDataList = (
        <datalist id="dust">
        {dustList.map((d) => (
          <DustSelection dust={d} key={d} />
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

      dustElement = (
       <select className="form-select select-lg selector" onChange={this.onDustChange}
         value={dust}>
        <option value="" disabled></option>
          {dustList.map((d) => (
            <DustSelection dust={d} key={d} />
          ))}
      </select>
    );
    }

    return (
      <form className="section" onSubmit={this.onSubmit}>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">trainer lv</span>
          <input onChange={this.onTrainerChange} className="form-input input-lg"
            value={trainerLevel}></input>
          <span className="input-group-addon addon-lg right-addon">{trainerStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">name</span>
          {nameElement}
          {nameDataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">cp</span>
          <input onChange={this.onCPChange} className="form-input input-lg"
            value={cp}></input>
          <span className="input-group-addon addon-lg right-addon">{cpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">hp</span>
          <input onChange={this.onHPChange} className="form-input input-lg"
            value={hp}></input>
          <span className="input-group-addon addon-lg right-addon">{hpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">dust</span>
          {dustElement}
          {dustDataList}
          <span className="input-group-addon addon-lg right-addon">{dustStatus}</span>
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
        <div className="new-section">
          {filterButton}
          <button className="btn btn-primary btn-lrg button-item"
            onClick={() => (this.onNewSearchSubmit(valid))}>
            <i className="fa fa-search" aria-hidden="true"></i> new
          </button>
          <button className="btn btn-primary btn-lrg button-item" onClick={this.onReset}>
            clear
          </button>
        </div>
      </form>
    );
  }
}

export default Input;
