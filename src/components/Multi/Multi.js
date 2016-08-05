import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MultiInput from './MultiInput';
import MultiOutput from './MultiOutput';
import MultiHeader from './MultiHeader';

export default class Multi extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      searchList: [],
    };

    this.onInputSubmit = this.onInputSubmit.bind(this);
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

  render() {
    return (
			<div className="page">
          <MultiHeader />
        <div className="middle-section">
          <MultiInput onInputSubmitCB={this.onInputSubmit} />
        </div>
          <MultiOutput {...this.state} />
			</div>
		);
  }
}
