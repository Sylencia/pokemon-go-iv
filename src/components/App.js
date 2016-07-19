import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import PokemonSelector from './PokemonSelector';

export default class App extends Component {
  render() {
    return (
			<div className="page">
        <PokemonSelector />
			</div>
		);
  }
}
