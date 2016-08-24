import React, { Component, PropTypes } from 'react';
import Modernizr from 'modernizr';
import '~/assets/stylesheets/Input.scss';
import '~/assets/stylesheets/Utility.scss';
import DustSelection from '~/components/DustSelection';
import * as Helper from '~/components/Helper/HelperFunctions';

class MultiInputRow extends Component {
  constructor() {
    super();

    this.cpChange = this.cpChange.bind(this);
    this.hpChange = this.hpChange.bind(this);
    this.dustChange = this.dustChange.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.dustList = Helper.getDustList();
  }

  cpChange(e) {
    this.props.onCPChange(e.target.value, this.props.index);
  }

  hpChange(e) {
    this.props.onHPChange(e.target.value, this.props.index);
  }

  dustChange(e) {
    this.props.onDustChange(e.target.value, this.props.index);
  }

  handleFocus(e) {
    e.target.select();
  }

  render() {
    const { cp, hp, dust } = this.props;
    const { dustList } = this;

    const validCP = Helper.validateNumericEntry(cp);
    const validHP = Helper.validateNumericEntry(hp);
    const validDust = Helper.validateDustEntry(dust);
    const valid = validCP && validHP && validDust;
    const validIcon = Helper.getValidityIcon(valid);

    let dustElement = '';
    let dustDataList = '';

    if (Modernizr.datalistelem) {
      dustElement = (
        <input onChange={this.dustChange} className="form-input input-lg multi-input-lg"
          onFocus={this.handleFocus} onMouseUp={(e) => {e.preventDefault();}}
          value={dust} type="text" list="dust" placeholder="dust"></input>);
      dustDataList = (
        <datalist id="dust">
        {dustList.map((d) => (
          <DustSelection dust={d} key={d} />
        ))}
      </datalist>);
    } else {
      dustElement = (
       <select className="form-select select-lg selector multi-input-lg" onChange={this.dustChange}
         value={dust}>
        <option value="" disabled></option>
          {dustList.map((d) => (
            <DustSelection dust={d} key={d} />
          ))}
      </select>
    );
    }


    return (
        <div className="input-group">
         <input onChange={this.cpChange}
           onFocus={this.handleFocus} onMouseUp={(e) => {e.preventDefault();}}
           className="form-input input-lg multi-input-lg" value={cp} placeholder="cp"></input>
         <input onChange={this.hpChange}
           onFocus={this.handleFocus} onMouseUp={(e) => {e.preventDefault();}}
           className="form-input input-lg multi-input-lg" value={hp} placeholder="hp"></input>
          {dustElement}
          {dustDataList}
        <span className="input-group-addon addon-lg right-addon">{validIcon}</span>
      </div>
    );
  }
}

MultiInputRow.propTypes = {
  cp: PropTypes.string.isRequired,
  hp: PropTypes.string.isRequired,
  dust: PropTypes.string.isRequired,
  onCPChange: PropTypes.func.isRequired,
  onHPChange: PropTypes.func.isRequired,
  onDustChange: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default MultiInputRow;
