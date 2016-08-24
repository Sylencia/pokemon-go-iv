import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MultiInput from './MultiInput';
import MultiOutput from './MultiOutput';
import MultiHeader from './MultiHeader';

export default class Multi extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      name: '',
      searchList: [],
      overallAppraisal: '',
      bestStat: '',
      ivAppraisal: '',
      options,
    };

    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.multi';
  }

  onInputSubmit(name, searchList, overallAppraisal, bestStat, ivAppraisal) {
    this.setState({
      name,
      searchList,
      overallAppraisal,
      bestStat,
      ivAppraisal,
    });
  }

  onOptionChange(options) {
    this.setState({
      options,
    });
  }

  render() {
    return (
			<div className="page">
          <MultiHeader onOptionChangeCB={this.onOptionChange} />
        <div className="middle-section">
          <MultiInput onInputSubmitCB={this.onInputSubmit} options={this.state.options} />
        </div>
          <MultiOutput {...this.state} />
			</div>
		);
  }
}
