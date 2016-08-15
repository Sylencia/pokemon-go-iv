import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from './Header';
import Options from '../Options';

export default class IVFinder extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      trainerLevel: 0,
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      wild: true,
      newSearch: true,
      options,
    };

    this.onInputSubmission = this.onInputSubmission.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.solo';
  }

  onInputSubmission(trainerLevel, name, cp, hp, dust, wild, newSearch) {
    this.setState({
      trainerLevel, name, cp, hp, dust, wild, newSearch,
    });
  }

  onOptionChange(options) {
    this.setState({
      options,
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
          <Options onOptionChangeCB={this.onOptionChange} />
			</div>
		);
  }
}
