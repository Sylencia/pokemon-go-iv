import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/Utility.scss';

class Options extends Component {
  static propTypes = {
    onOptionChangeCB: PropTypes.func.isRequired,
  }

  constructor() {
    super();

    const localOptions = JSON.parse(localStorage.getItem('options')) || [];
    const fullLevel = localOptions.fullLevel || false;
    const atkFirst = localOptions.atkFirst || false;
    const team = localOptions.team || 'mystic';
    const hideToast = localOptions.hideToast || false;

    this.state = {
      options: {
        fullLevel,
        atkFirst,
        team,
        hideToast,
      },
      modalOpen: false,
    };
    this.onAtkConventionToggle = this.onAtkConventionToggle.bind(this);
    this.onLevelConventionToggle = this.onLevelConventionToggle.bind(this);
    this.onTeamChange = this.onTeamChange.bind(this);
    this.onModalOpen = this.onModalOpen.bind(this);
    this.onModalClose = this.onModalClose.bind(this);
    this.closeToast = this.closeToast.bind(this);
  }

  onAtkConventionToggle(e) {
    const optionsState = this.state.options;
    optionsState.atkFirst = e.target.checked;
    localStorage.setItem('options', JSON.stringify(optionsState));
    this.setState({
      options: optionsState,
    });

    this.props.onOptionChangeCB(optionsState);
  }

  onLevelConventionToggle(e) {
    const optionsState = this.state.options;
    optionsState.fullLevel = e.target.checked;
    localStorage.setItem('options', JSON.stringify(optionsState));
    this.setState({
      options: optionsState,
    });

    this.props.onOptionChangeCB(optionsState);
  }

  onTeamChange(e) {
    const optionsState = this.state.options;
    optionsState.team = e.target.value;
    localStorage.setItem('options', JSON.stringify(optionsState));
    this.setState({
      options: optionsState,
    });

    this.props.onOptionChangeCB(optionsState);
  }

  onModalOpen() {
    this.setState({
      modalOpen: true,
    });

    this.closeToast();
  }

  onModalClose() {
    this.setState({
      modalOpen: false,
    });
  }

  closeToast() {
    const optionsState = this.state.options;
    optionsState.hideToast = true;
    localStorage.setItem('options', JSON.stringify(optionsState));

    this.setState({
      options: optionsState,
    });

    this.props.onOptionChangeCB(optionsState);
  }

  render() {
    const { modalOpen, options } = this.state;

    let modalClass = 'modal modal-sm';
    if (modalOpen) {
      modalClass = 'modal modal-sm active';
    }

    let toast = '';
    if (!options.hideToast) {
      toast = (
        <div className="toast toast-primary">
          <button className="btn btn-clear float-right" onClick={this.closeToast} />
          <span className="icon icon-error_outline" />
          ensure you have set your team in the options!
        </div>
      );
    }

    return (
      <span>
          <button className="btn btn-lrg button-item" onClick={this.onModalOpen}>
            options
          </button>
          <div className={modalClass}>
            <div className="modal-overlay" onClick={this.onModalClose}></div>
            <div className="modal-container">
              <div className="modal-header">
                options
              </div>
              <div className="modal-body">
                <div>
                  <label className="form-switch">
                    <input type="checkbox" onChange={this.onLevelConventionToggle}
                      checked={options.fullLevel} />
                    <i className="form-icon"></i>
                    <span>use full level convention (no 0.5)</span>
                  </label>
                </div>
                <div>
                  <label className="form-switch">
                    <input type="checkbox" onChange={this.onAtkConventionToggle}
                      checked={options.atkFirst} />
                    <i className="form-icon"></i>
                    <span>show hp last</span>
                  </label>
                </div>
                <hr />
                <div>
                  <span>team</span>
                  <select className="form-select select-lg selector" onChange={this.onTeamChange}
                    value={options.team}>
                    <option value="instinct">instinct</option>
                    <option value="mystic">mystic</option>
                    <option value="valor">valor</option>
                 </select>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary btn-lrg"
                  onClick={this.onModalClose}>
                  close
                </button>
              </div>
            </div>
          </div>
          {toast}
      </span>
    );
  }
}

export default Options;
