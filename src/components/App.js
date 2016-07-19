import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Input from './Input';

export default class App extends Component {
  render() {
    return (
			<div className="page">
        <Input />
			</div>
		);
  }
}
