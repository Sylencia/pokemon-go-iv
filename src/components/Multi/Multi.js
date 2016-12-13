import '~/assets/stylesheets/App.scss';
import React, { Component } from 'react';
import MultiInput from './MultiInput';
import MultiOutput from './MultiOutput';
import Header from '../Header';

export default class Multi extends Component {
  constructor() {
    super();

    const options = JSON.parse(localStorage.getItem('options')) || {};

    this.state = {
      name: '',
      searchList: [],
      overallAppraisal: '',
      bestStat: '',
      ivAppraisal: '',
      options,
    };

    this.onInputSubmit = this.onInputSubmit.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  componentDidMount() {
    document.title = 'iv.multi';
  }

  onInputSubmit(name, searchList, overallAppraisal, bestStat, ivAppraisal) {
    this.setState({
      name,
      searchList,
      overallAppraisal,
      bestStat,
      ivAppraisal,
    });
  }

  onOptionChange(options) {
    this.setState({
      options,
    });
  }

  render() {
    const faqText = (
      <span>
        <h5><u>what is this page for?</u></h5>
        when you are out looking for pokémon with others, and you encounter a wild pokémon, the
        ivs of that pokémon will be set the same for everyone. the differnce is the cp which is
        determined by the trainer level. thus, if you have a group of trainers with various
        levels, you can use this tool to find a much more narrow iv range without spending dust.
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
          <Header onOptionChangeCB={this.onOptionChange} headerTitle="iv.multi" faqText={faqText} />
        <div className="middle-section">
          <MultiInput onInputSubmitCB={this.onInputSubmit} options={this.state.options} />
        </div>
          <MultiOutput {...this.state} />
			</div>
		);
  }
}
