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
      level: 0,
      wild: false,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.multi';
  }

  onNameChange(name) {
    this.setState({
      name,
    });
  }

  onLevelChange(level) {
    this.setState({
      level,
    });
  }

  onWildChange(wild) {
    this.setState({
      wild,
    });
  }

  render() {
    return (
			<div className="page">
          <MultiHeader />
        <div className="middle-section">
          <MultiInput onNameChangeCB={this.onNameChange} onLevelChangeCB={this.onLevelChange}
            onWildChangeCB={this.onWildChange} />
        </div>
          <MultiOutput {...this.state} />
			</div>
		);
  }
}
