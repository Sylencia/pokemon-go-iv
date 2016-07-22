import React, { Component, PropTypes } from 'react';
import '../assets/stylesheets/Input.scss';
import Pokemon from '../assets/data/Pokemon.json';
import Dust from '../assets/data/Dust.json';
import '../assets/stylesheets/utility.scss';

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number);
}

function validateDustEntry(number) {
  const dustData = Dust.find((dust) =>
    (dust.cost === Number(number)));
  return dustData !== null && dustData !== undefined;
}

function getValidityIcon(item) {
  if (item) {
    return <i className="fa fa-check" aria-hidden="true"></i>;
  }

  return <i className="fa fa-times" aria-hidden="true"></i>;
}

class Input extends Component {
  static propTypes = {
    onValidInputCB: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      found: false,
      pokemon: {},
      validCP: false,
      validHP: false,
      validDust: false,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCPChange = this.onCPChange.bind(this);
    this.onHPChange = this.onHPChange.bind(this);
    this.onDustChange = this.onDustChange.bind(this);
    this.checkValidInput = this.checkValidInput.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
  }

  onChange(e) {
    let pkmn = Pokemon.find((pokemon) =>
      (pokemon.name.toLowerCase() === e.target.value.toLowerCase()));
    const found = pkmn !== null && pkmn !== undefined;

    if (!found) {
      pkmn = {};
    }

    this.checkValidInput({ ...this.state,
      name: e.target.value, found, pokemon: pkmn });

    this.setState({
      name: e.target.value,
      found,
      pokemon: pkmn,
    });
  }

  onCPChange(e) {
    this.checkValidInput({ ...this.state,
      CP: e.target.value, validCP: validateNumericEntry(e.target.value) });

    this.setState({
      CP: e.target.value,
      validCP: validateNumericEntry(e.target.value),
    });
  }

  onHPChange(e) {
    this.checkValidInput({ ...this.state,
      HP: e.target.value, validHP: validateNumericEntry(e.target.value) });

    this.setState({
      HP: e.target.value,
      validHP: validateNumericEntry(e.target.value),
    });
  }

  onDustChange(e) {
    this.checkValidInput({ ...this.state,
      dust: e.target.value, validDust: validateDustEntry(e.target.value) });

    this.setState({
      dust: e.target.value,
      validDust: validateDustEntry(e.target.value),
    });
  }

  checkValidInput(newState) {
    const { found, validCP, validHP,
      validDust, pokemon, CP, HP, dust } = newState;
    const { onValidInputCB } = this.props;

    if (found && validCP && validHP && validDust) {
      onValidInputCB(pokemon, Number(CP), Number(HP), Number(dust));
    }
  }

  render() {
    let nameStatus = getValidityIcon(this.state.found);
    let cpStatus = getValidityIcon(this.state.validCP);
    let hpStatus = getValidityIcon(this.state.validHP);
    let dustStatus = getValidityIcon(this.state.validDust);

    return (
      <div className="section">
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">name</span>
          <input onChange={this.onChange} className="form-input input-lg"></input>
          <span className="input-group-addon addon-lg right-addon">{nameStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">cp</span>
          <input onChange={this.onCPChange} className="form-input input-lg"></input>
          <span className="input-group-addon addon-lg right-addon">{cpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">hp</span>
          <input onChange={this.onHPChange} className="form-input input-lg"></input>
          <span className="input-group-addon addon-lg right-addon">{hpStatus}</span>
        </div>
        <div className="input-group">
          <span className="input-group-addon addon-lg left-addon">dust</span>
          <input onChange={this.onDustChange} className="form-input input-lg"></input>
          <span className="input-group-addon addon-lg right-addon">{dustStatus}</span>
        </div>
      </div>
    );
  }
}

export default Input;
