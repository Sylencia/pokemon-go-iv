import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from './Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      pokemon: {},
      cp: 0,
      hp: 0,
      dust: 0,
    };

    this.onValidInputChange = this.onValidInputChange.bind(this);
  }

  onValidInputChange(pokemon, cp, hp, dust) {
    this.setState({
      pokemon,
      cp,
      hp,
      dust,
    });
  }

  render() {
    return (
			<div className="page">
        <Header />
        <Input onValidInputCB={this.onValidInputChange} />
        <Output pokemon={this.state.pokemon} cp={this.state.cp}
          hp={this.state.hp} dust={this.state.dust} />
			</div>
		);
  }
}
