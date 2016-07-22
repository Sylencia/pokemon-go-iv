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
    };

    this.onInputSubmission = this.onInputSubmission.bind(this);
  }

  onInputSubmission(name, cp, hp, dust) {
    this.setState({
      name,
      cp,
      hp,
      dust,
    });
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
