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
    options: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    const trainerLevel = localStorage.getItem('trainerLevel') || '';

    this.state = {
      trainerLevel,
      name: '',
      cp: '',
      hp: '',
      dust: '',
      overallAppraisal: '',
      stamBest: false,
      atkBest: false,
      defBest: false,
      ivAppraisal: '',
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
    this.onStamBestChange = this.onStamBestChange.bind(this);
    this.onAtkBestChange = this.onAtkBestChange.bind(this);
    this.onDefBestChange = this.onDefBestChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
    this.onTrainerChange = this.onTrainerChange.bind(this);
    this.onOverallAnalysisChange = this.onOverallAnalysisChange.bind(this);
    this.onIVAppraisalChange = this.onIVAppraisalChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

    this.pokemonList = Helper.getPokemonList();
    this.dustList = Helper.getDustList();
  }

  onReset() {
    this.setState({
      name: '',
      cp: '',
      hp: '',
      dust: '',
      stamBest: false,
      atkBest: false,
      defBest: false,
      overallAppraisal: '',
      ivAppraisal: '',
      wild: true,
    });
  }

  onSubmit(e) {
    e.preventDefault();

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
    const { trainerLevel, name, cp, hp, dust, wild,
      atkBest, defBest, stamBest, overallAppraisal, ivAppraisal } = this.state;

    if (valid) {
      const bestString = Helper.getBestString(stamBest, atkBest, defBest);
      this.props.onInputSubmitCB(Number(trainerLevel), name.toLowerCase(), Number(cp), Number(hp),
        Number(dust), overallAppraisal, bestString, ivAppraisal, wild, true);

      this.setState({
        isNewSearch: false,
      });
    }
  }

  onFilterSubmit(valid) {
    const { trainerLevel, name, cp, hp, dust,
      atkBest, defBest, stamBest, overallAppraisal, ivAppraisal } = this.state;

    if (valid) {
      const bestString = Helper.getBestString(stamBest, atkBest, defBest);
      this.props.onInputSubmitCB(Number(trainerLevel), name.toLowerCase(), Number(cp), Number(hp),
        Number(dust), overallAppraisal, bestString, ivAppraisal, false, false);
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

  onAtkBestChange(e) {
    this.setState({
      atkBest: e.target.checked,
    });
  }

  onDefBestChange(e) {
    this.setState({
      defBest: e.target.checked,
    });
  }

  onStamBestChange(e) {
    this.setState({
      stamBest: e.target.checked,
    });
  }

  onOverallAnalysisChange(e) {
    this.setState({
      overallAppraisal: e.target.value,
    });
  }

  onIVAppraisalChange(e) {
    this.setState({
      ivAppraisal: e.target.value,
    });
  }

  onTrainerChange(e) {
    localStorage.setItem('trainerLevel', e.target.value);

    this.setState({
      trainerLevel: e.target.value,
    });
  }

  handleFocus(e) {
    e.target.select();
  }

  render() {
    const { trainerLevel, name, cp, hp, dust, wild,
      atkBest, defBest, stamBest, isNewSearch, overallAppraisal, ivAppraisal } = this.state;
    const { options } = this.props;
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
          onFocus={this.handleFocus}
          onMouseUp={(e) => {e.preventDefault();}}
          value={name} type="text" list="pokemon"></input>);
      nameDataList = (
        <datalist id="pokemon">
        {pokemonList.map((pokemon) => (
          <PokemonSelection name={pokemon} key={pokemon} />
        ))}
      </datalist>);

      dustElement = (
        <input onChange={this.onDustChange} className="form-input input-lg"
          onFocus={this.handleFocus}
          onMouseUp={(e) => {e.preventDefault();}} value={dust} type="text" list="dust"></input>);
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

    // default to mystic, undefined or missing team
    let greatOverallValue = 'Your pokémon is a wonder! What a breathtaking pokémon!';
    let goodOverallValue = 'Your pokémon has certainly caught my attention.';
    let averageOverallValue = 'Your pokémon is above average.';
    let badOverallValue = 'Your pokémon is not likely to make much headway in battle.';
    if (options.team === 'valor') {
      greatOverallValue = 'Your pokémon simply amazes me. It can accomplish anything!';
      goodOverallValue = 'Your pokémon is a strong pokémon.';
      averageOverallValue = 'Your pokémon is a decent pokémon.';
      badOverallValue = 'Your pokémon may not be great in battle, but I still like it!';
    } else if (options.team === 'instinct') {
      greatOverallValue = 'Your pokémon looks like it can really battle with the best of them!';
      goodOverallValue = 'Your pokémon is really strong!';
      averageOverallValue = 'Your pokémon is pretty decent!';
      badOverallValue = 'Your pokémon has room for improvement as far as battling goes.';
    }

    // default to mystic, undefined or missing team
    let greatIvValue = 'Its stats exceed my calculations. It\'s incredible!';
    let goodIvValue = 'I am certainly impressed by its stats, I must say.';
    let averageIvValue = 'Its stats are noticeably trending to the positive.';
    let badIvValue = 'Its stats are not out of the norm, in my opinion.';
    if (options.team === 'valor') {
      greatIvValue = 'I\'m blown away by its stats. WOW!';
      goodIvValue = 'Its got excellent stats! How exciting!';
      averageIvValue = 'Its stats indicate that in battle, it\'ll get the job done.';
      badIvValue = 'Its stats don\'t point to greatness in battle.';
    } else if (options.team === 'instinct') {
      greatIvValue = 'Its stats are the best I\'ve ever seen! No doubt about it!';
      goodIvValue = 'Its stats are really strong! Impressive.';
      averageIvValue = 'It\'s definitely got some good stats. Definitely!';
      badIvValue = 'Its stats are alright, but kinda basic, as far as I can see.';
    }

    return (
      <form className="section" onSubmit={this.onSubmit}>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">trainer lv</span>
          <input onChange={this.onTrainerChange} className="form-input input-lg"
            onFocus={this.handleFocus}
            onMouseUp={(e) => {e.preventDefault();}} value={trainerLevel}></input>
          <span className="input-group-addon addon-lg right-addon">{trainerStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">pokémon</span>
          {nameElement}
          {nameDataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">cp</span>
          <input onChange={this.onCPChange} className="form-input input-lg"
            onFocus={this.handleFocus}
            onMouseUp={(e) => {e.preventDefault();}} value={cp}></input>
          <span className="input-group-addon addon-lg right-addon">{cpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">hp</span>
          <input onChange={this.onHPChange} className="form-input input-lg"
            onFocus={this.handleFocus}
            onMouseUp={(e) => {e.preventDefault();}} value={hp}></input>
          <span className="input-group-addon addon-lg right-addon">{hpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">dust</span>
          {dustElement}
          {dustDataList}
          <span className="input-group-addon addon-lg right-addon">{dustStatus}</span>
        </div>
        <hr />
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">appraisal 1</span>
            <select className="form-select select-lg selector"
              onChange={this.onOverallAnalysisChange}
              value={overallAppraisal}>
             <option value="" disabled></option>
             <option value="great">{greatOverallValue}</option>
             <option value="good">{goodOverallValue}</option>
             <option value="average">{averageOverallValue}</option>
             <option value="bad">{badOverallValue}</option>
            </select>
        </div>
        <div>
          <div className="checkbox-item">
            <span className="stat-text">best stats: </span>
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onStamBestChange}
                checked={stamBest} />
              <i className="form-icon"></i>
              <span className="checkbox-text">stamina</span>
            </label>
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onAtkBestChange}
                checked={atkBest} />
              <i className="form-icon"></i>
              <span className="checkbox-text">attack</span>
            </label>
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onDefBestChange}
                checked={defBest} />
              <i className="form-icon"></i>
              <span className="checkbox-text">defense</span>
            </label>
          </div>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">appraisal 2</span>
            <select className="form-select select-lg selector"
              onChange={this.onIVAppraisalChange}
              value={ivAppraisal}>
             <option value="" disabled></option>
             <option value="great">{greatIvValue}</option>
             <option value="good">{goodIvValue}</option>
             <option value="average">{averageIvValue}</option>
             <option value="bad">{badIvValue}</option>
            </select>
        </div>
        <hr />
        <div className="new-section">
          <div className="checkbox-item">
            <label className="form-checkbox">
              <input type="checkbox" onChange={this.onWildChange} checked={wild} />
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
