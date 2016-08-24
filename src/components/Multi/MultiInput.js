import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import { times } from 'lodash';
import '~/assets/stylesheets/Input.scss';
import '~/assets/stylesheets/Utility.scss';
import PokemonSelection from '~/components/PokemonSelection';
import MultiInputRow from './MultiInputRow';
import * as Helper from '~/components/Helper/HelperFunctions';

function setupList(list, oldSize, newSize) {
  const newList = list;

  if (oldSize < newSize) {
    for (let i = oldSize; i < list.length; ++i) {
      newList[i].cp = '';
      newList[i].hp = '';
      newList[i].dust = '';
    }
  }

  return newList;
}

class MultiInput extends Component {
  static propTypes = {
    onInputSubmitCB: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      validName: '',
      list: [
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
      ],
      size: 2,
      stamBest: false,
      atkBest: false,
      defBest: false,
      overallAppraisal: '',
      ivAppraisal: '',
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.onStamBestChange = this.onStamBestChange.bind(this);
    this.onAtkBestChange = this.onAtkBestChange.bind(this);
    this.onDefBestChange = this.onDefBestChange.bind(this);
    this.onOverallAnalysisChange = this.onOverallAnalysisChange.bind(this);
    this.onIVAppraisalChange = this.onIVAppraisalChange.bind(this);
    this.onSizeChange = this.onSizeChange.bind(this);
    this.onNewSearchSubmit = this.onNewSearchSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
  }

  onCPChange(cp, index) {
    const newList = this.state.list;
    newList[index].cp = cp;
    this.setState({
      list: newList,
    });
  }

  onHPChange(hp, index) {
    const newList = this.state.list;
    newList[index].hp = hp;
    this.setState({
      list: newList,
    });
  }

  onDustChange(dust, index) {
    const newList = this.state.list;
    newList[index].dust = dust;
    this.setState({
      list: newList,
    });
  }

  onNameChange(e) {
    const name = e.target.value;

    if (Helper.validatePokemonEntry(name)) {
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

  onReset(e) {
    e.preventDefault();

    this.setState({
      name: '',
      validName: '',
      list: [
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
        { cp: '', hp: '', dust: '' },
      ],
      stamBest: false,
      atkBest: false,
      defBest: false,
      overallAppraisal: '',
      ivAppraisal: '',
    });
  }

  onSizeChange(e) {
    const size = Number(e.target.value);
    const list = setupList(this.state.list, this.state.size, size);
    this.setState({
      size,
      list,
    });
  }

  onNewSearchSubmit(e) {
    e.preventDefault();
    const { validName, list, size,
      atkBest, defBest, stamBest, overallAppraisal, ivAppraisal } = this.state;
    let valid = true;

    for (let i = 0; i < size; ++i) {
      const validCP = Helper.validateNumericEntry(list[i].cp);
      const validHP = Helper.validateNumericEntry(list[i].hp);
      const validDust = Helper.validateDustEntry(list[i].dust);
      if (!((validCP && validHP && validDust) || (!validCP && !validHP && !validDust))) {
        valid = false;
        break;
      }
    }

    if (valid) {
      const bestString = Helper.getBestString(stamBest, atkBest, defBest);
      this.props.onInputSubmitCB(validName.toLowerCase(),
        list.slice(0, this.state.size), overallAppraisal, bestString, ivAppraisal);
    }
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

  handleFocus(e) {
    e.target.select();
  }

  render() {
    const { name, size, list,
      atkBest, defBest, stamBest, overallAppraisal, ivAppraisal } = this.state;
    const { options } = this.props;
    const { onCPChange, onDustChange, onHPChange } = this;

    console.log(this.state);

    const validPokemon = Helper.validatePokemonEntry(name);
    const nameStatus = Helper.getValidityIcon(validPokemon);
    const pokemonList = Helper.getPokemonList();

    // hacky since i don't want div or span to wreck my styling
    let nameElement = '';
    let dataList = '';

    if (Modernizr.datalistelem) {
      nameElement = (
        <input onChange={this.onNameChange} className="form-input input-lg"
          onFocus={this.handleFocus} onMouseUp={(e) => {e.preventDefault();}}
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

    const rows = [];
    times(size, (index) => (rows.push(
      <MultiInputRow cp={list[index].cp} hp={list[index].hp} dust={list[index].dust}
        onHPChange={onHPChange} onCPChange={onCPChange}
        onDustChange={onDustChange} key={index} index={index} />
    )));

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

    const stamCheck = (
      <label className="form-checkbox">
        <input type="checkbox" onChange={this.onStamBestChange}
          checked={stamBest} />
        <i className="form-icon"></i>
        <span className="checkbox-text">hp</span>
      </label>
    );
    const atkCheck = (
      <label className="form-checkbox">
        <input type="checkbox" onChange={this.onAtkBestChange}
          checked={atkBest} />
        <i className="form-icon"></i>
        <span className="checkbox-text">atk</span>
      </label>
    );
    const defCheck = (
      <label className="form-checkbox">
        <input type="checkbox" onChange={this.onDefBestChange}
          checked={defBest} />
        <i className="form-icon"></i>
        <span className="checkbox-text">def</span>
      </label>
    );
    let bestStatArea = (
      <div className="checkbox-item">
        <span className="stat-text">best stats: </span>
        {stamCheck}
        {atkCheck}
        {defCheck}
      </div>
    );
    if (options.atkFirst) {
      bestStatArea = (
        <div className="checkbox-item">
          <span className="stat-text">best stats: </span>
          {atkCheck}
          {defCheck}
          {stamCheck}
        </div>
      );
    }

    return (
      <form className="section" onSubmit={this.onNewSearchSubmit}>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon-wide">group size</span>
          <select className="form-select select-lg selector" onChange={this.onSizeChange}
            value={size}>
           <option value="2">2</option>
           <option value="3">3</option>
           <option value="4">4</option>
           <option value="5">5</option>
           <option value="6">6</option>
          </select>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">pokémon</span>
          {nameElement}
          {dataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        {rows}
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
          {bestStatArea}
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
          <button className="btn btn-primary btn-lrg button-item"
            type="submit" onClick={this.onNewSearchSubmit}>
            <i className="fa fa-search" aria-hidden="true"></i> search
          </button>
          <button className="btn btn-primary btn-lrg button-item"
            type="reset" onClick={this.onReset}>
            clear
          </button>
        </div>
      </form>
    );
  }
}

export default MultiInput;
