import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from './Header';

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
      overallAppraisal: '',
      bestStat: '',
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

  onInputSubmission(trainerLevel, name, cp, hp, dust, overallAppraisal, bestStat, wild, newSearch) {
    this.setState({
      trainerLevel, name, cp, hp, dust, bestStat, overallAppraisal, wild, newSearch,
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
      overallAppraisal: '',
      bestStat: '',
    };
  }

  render() {
    return (
			<div className="page">
          <Header onOptionChangeCB={this.onOptionChange} />
        <div className="middle-section">
          <Input onInputSubmitCB={this.onInputSubmission} options={this.state.options} />
        </div>
          <Output {...this.state} />
			</div>
		);
  }
}
