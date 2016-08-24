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
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onReset = this.onReset.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
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
    const { validName, list, size } = this.state;
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
      this.props.onInputSubmitCB(validName.toLowerCase(), list.slice(0, this.state.size));
    }
  }

  handleFocus(e) {
    e.target.select();
  }

  render() {
    const { name, size, list } = this.state;
    const { onCPChange, onDustChange, onHPChange } = this;

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
          <span className="input-group-addon addon-lg left-addon">name</span>
          {nameElement}
          {dataList}
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        {rows}
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
