import '../assets/stylesheets/base.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from './Header';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      wild: true,
      newSearch: true,
    };

    this.onInputSubmission = this.onInputSubmission.bind(this);
  }

  onInputSubmission(name, cp, hp, dust, wild, newSearch) {
    this.setState({
      name, cp, hp, dust, wild, newSearch,
    });
  }

  onResetRequest() {
    this.state = {
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      wild: true,
    };
  }

  render() {
    return (
			<div className="page">
          <Header />
        <div className="middle-section">
          <Input onInputSubmitCB={this.onInputSubmission} />
        </div>
          <Output {...this.state} />
			</div>
		);
  }
}
