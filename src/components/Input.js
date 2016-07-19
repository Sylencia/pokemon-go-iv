import React, { Component } from 'react';
import '../assets/stylesheets/Input.scss';
import '../assets/stylesheets/Pokemon.scss';
import Pokemon from '../assets/data/Pokemon.json';

class Input extends Component {
  constructor() {
    super();

    this.state = { name: '', found: false, pokemon: {} };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
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

  render() {
    let classes = this.state.found ? 'is-success' : 'is-danger';
    classes = `${classes} form-input input-lg`;

    const pokemonClass = `pkm mini column col-1 pkm${this.state.pokemon.number}`;
    return (
      <div className="input-section">
        <div className="columns">
          <div className={pokemonClass}></div>
          <div className="column col-5">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input onChange={this.onChange} className={classes}
                  placeholder="Find Pokemon"></input>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Input;
