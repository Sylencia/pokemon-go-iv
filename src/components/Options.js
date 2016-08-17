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
    const atkFirst = localOptions.atkFirst || false;

    this.state = { halfLevel, atkFirst };
    this.onAtkConventionToggle = this.onAtkConventionToggle.bind(this);
    this.onLevelConventionToggle = this.onLevelConventionToggle.bind(this);
  }

  onAtkConventionToggle(e) {
    const state = this.state;
    state.atkFirst = e.target.checked;
    localStorage.setItem('options', JSON.stringify(state));
    this.setState({
      atkFirst: e.target.checked,
    });

    this.props.onOptionChangeCB(state);
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
          <label className="form-switch">
            <input type="checkbox" onChange={this.onAtkConventionToggle}
              checked={this.state.atkFirst} />
            <i className="form-icon"></i>
            <span>show stamina last</span>
          </label>
      </div>
    );
  }
}

export default Options;
