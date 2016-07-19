import React, { Component } from 'react';
import '../assets/stylesheets/Input.scss';
import '../assets/stylesheets/Pokemon.scss';
import Pokemon from '../assets/data/Pokemon.json';

// stackoverflow.com/questions/10834796/validate-that-a-string-is-a-positive-integer
function validateNumericEntry(number) {
  return number >>> 0 === parseFloat(number);
}

class Input extends Component {
  constructor() {
    super();

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

    this.setState({
      name: e.target.value,
      found,
      pokemon: pkmn,
    });
  }

  onCPChange(e) {
    this.setState({
      validCP: validateNumericEntry(e.target.value),
    });
  }

  onHPChange(e) {
    this.setState({
      validHP: validateNumericEntry(e.target.value),
    });
  }

  onDustChange(e) {
    this.setState({
      validDust: validateNumericEntry(e.target.value),
    });
  }

  render() {
    let classes = this.state.found ? 'is-success' : 'is-danger';
    classes = `${classes} form-input input-lg`;

    let cpclasses = this.state.validCP ? 'is-success' : 'is-danger';
    cpclasses = `${cpclasses} form-input input-lg`;

    let hpclasses = this.state.validHP ? 'is-success' : 'is-danger';
    hpclasses = `${hpclasses} form-input input-lg`;

    let dustclasses = this.state.validDust ? 'is-success' : 'is-danger';
    dustclasses = `${dustclasses} form-input input-lg`;

    return (
      <div className="input-section">
        <div className="columns">
          <div className="column col-3" />
          <div className="column col-6">
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <span className="form-label">Name</span>
                  <input onChange={this.onChange} className={classes}></input>
                </div>
                <div className="columns">
                  <div className="form-group column col-4">
                    <span className="form-label">CP</span>
                    <input onChange={this.onCPChange} className={cpclasses}></input>
                  </div>
                  <div className="form-group column col-4">
                    <span className="form-label ">HP</span>
                    <input onChange={this.onHPChange} className={hpclasses}></input>
                  </div>
                  <div className="form-group column col-4">
                    <span className="form-label">Dust</span>
                    <input onChange={this.onDustChange} className={dustclasses}></input>
                  </div>
                </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
