import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MultiInput from './MultiInput';
import MultiOutput from './MultiOutput';
import MultiHeader from './MultiHeader';
import Options from '../Options';

export default class Multi extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      name: '',
      searchList: [],
      options,
    };

    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.multi';
  }

  onInputSubmit(name, searchList) {
    this.setState({
      name,
      searchList,
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
          <MultiHeader />
        <div className="middle-section">
          <MultiInput onInputSubmitCB={this.onInputSubmit} />
        </div>
          <MultiOutput {...this.state} />
          <Options onOptionChangeCB={this.onOptionChange} />
			</div>
		);
  }
}
