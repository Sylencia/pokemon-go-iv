import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MinmaxInput from './MinmaxInput';
import MinmaxOutput from './MinmaxOutput';
import MinmaxHeader from './MinmaxHeader';

export default class Minmax extends Component {
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
    document.title = 'iv.minmax';
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
          <MinmaxHeader />
        <div className="middle-section">
          <MinmaxInput onNameChangeCB={this.onNameChange} onLevelChangeCB={this.onLevelChange}
            onWildChangeCB={this.onWildChange} />
        </div>
          <MinmaxOutput {...this.state} />
			</div>
		);
  }
}
