import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MinmaxInput from './MinmaxInput';
import MinmaxOutput from './MinmaxOutput';
import Header from '../Header';

export default class Minmax extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      name: '',
      level: 0,
      wild: false,
      options,
    };

    this.onNameChange = this.onNameChange.bind(this);
    this.onLevelChange = this.onLevelChange.bind(this);
    this.onWildChange = this.onWildChange.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
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

  onOptionChange(options) {
    this.setState({
      options,
    });
  }

  onWildChange(wild) {
    this.setState({
      wild,
    });
  }

  render() {
    const faqText = (
      <span>
        <h5><u>what is this?</u></h5>
        this page is used for quick referencing how good your pokémon is. when you are out and
        about, there's no time to manually enter each pokémon's stats, so this will give you
        a rough estimate as to wheter it's closer to the lower or higher end of the spectrum.
        <h5><u>what about hatched pokémon?</u></h5>
        hatched pokémon have a maximum level of 39. there may be a toggle later to help you
        keep track of that.
      </span>
    );

    return (
			<div className="page">
          <Header onOptionChangeCB={this.onOptionChange}
            headerTitle="iv.minmax2" faqText={faqText} />
        <div className="middle-section">
          <MinmaxInput onNameChangeCB={this.onNameChange} onLevelChangeCB={this.onLevelChange}
            onWildChangeCB={this.onWildChange} />
        </div>
          <MinmaxOutput {...this.state} />
			</div>
		);
  }
}
