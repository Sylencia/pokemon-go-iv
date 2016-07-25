import '~/assets/stylesheets/IVFinder/base.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from './Header';

export default class IVFinder extends Component {
  constructor() {
    super();

    this.state = {
      trainerLevel: 0,
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      wild: true,
      newSearch: true,
    };

    this.onInputSubmission = this.onInputSubmission.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.finder';
  }

  onInputSubmission(trainerLevel, name, cp, hp, dust, wild, newSearch) {
    this.setState({
      trainerLevel, name, cp, hp, dust, wild, newSearch,
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
