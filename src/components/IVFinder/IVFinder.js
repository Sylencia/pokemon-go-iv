import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import Input from './Input';
import Output from './Output';
import Header from '../Header';

export default class IVFinder extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      overallAppraisal: '',
      bestStat: '',
      ivAppraisal: '',
      wild: true,
      newSearch: true,
      options,
    };

    this.onInputSubmission = this.onInputSubmission.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.solo';
  }

  onInputSubmission(name, cp, hp, dust, overallAppraisal,
    bestStat, ivAppraisal, wild, newSearch) {
    this.setState({
      name, cp, hp, dust, bestStat, overallAppraisal, ivAppraisal, wild, newSearch,
    });
  }

  onOptionChange(options) {
    this.setState({
      options,
    });
  }

  onResetRequest() {
    this.state = {
      name: '',
      cp: 0,
      hp: 0,
      dust: 0,
      wild: true,
      overallAppraisal: '',
      bestStat: '',
      ivAppraisal: '',
    };
  }

  render() {
    const faqText = (
      <span>
        <h5><u>what are ivs?</u></h5>
        ivs are hidden stats which are assigned to each pokémon you have caught or hatched.
        <br />
        the three stats ivs are assigned for are: stamina(hp), attack and defense.<br />
        each iv ranges between 0 and 15, thus having 15 for each iv is considered a 'perfect
        pokémon'.
        <h5><u>what do i put for 'dust'?</u></h5>
        on the pokémon's status screen, there's a button that lets you power it up for a cost.
        <br />
        simply fill in the amount of dust that it requires you to use to power it up.
        <h5><u>what is 'untrained wild'?</u></h5>
        pokémon that were caught in the wild have odd numbered levels. having this ticked means
        that we only consider odd numbered levels for your pokémon.
        <b>untick if:</b> you hatched the pokémon or you have used 'power up' on your pokémon.
        <h5><u>what is '<i className="fa fa-search fa-1" aria-hidden="true"></i> same'?</u></h5>
        if you power up or evolve your pokémon, you can use that information along with the
        previous stats that you entered to get a more narrow result. for most pokémon you will
        need to do this a few times to get the exact number.
        <h5><u>what is 'iv %'?</u></h5>
        the iv % shows you how close to maximum that iv set is. this is achieved by dividing the
        sum of the three ivs by the maximum sum, which is 45.
        <h5><u>what is 'potential'? why are there two numbers?</u></h5>
        the two types of potential are <b>offensive</b> and <b>defensive</b> potential.<br />
        offensive potential scales primarily on attack, where as defensive potential scales on
        both the defensive stats, stamina and defense.
      </span>
    );

    return (
			<div className="page">
          <Header onOptionChangeCB={this.onOptionChange} headerTitle="iv.solo" faqText={faqText} />
        <div className="middle-section">
          <Input onInputSubmitCB={this.onInputSubmission} options={this.state.options} />
        </div>
          <Output {...this.state} />
			</div>
		);
  }
}
