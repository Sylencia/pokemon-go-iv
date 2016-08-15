import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/Utility.scss';

class Options extends Component {
  static propTypes = {
    onOptionChangeCB: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    const localOptions = JSON.parse(localStorage.getItem('options')) || [];
    const halfLevel = localOptions.halfLevel || false;

    this.state = { halfLevel };
    this.onLevelConventionToggle = this.onLevelConventionToggle.bind(this);
  }

  onLevelConventionToggle(e) {
    const state = this.state;
    state.halfLevel = e.target.checked;
    localStorage.setItem('options', JSON.stringify(state));
    this.setState({
      halfLevel: e.target.checked,
    });

    this.props.onOptionChangeCB(state);
  }

  render() {
    return (
      <div className="section">
          <label className="form-switch">
            <input type="checkbox" onChange={this.onLevelConventionToggle}
              checked={this.state.halfLevel} />
            <i className="form-icon"></i>
            <span>use half levels</span>
          </label>
      </div>
    );
  }
}

export default Options;
