import React, { Component } from 'react';
import '~/assets/stylesheets/Header.scss';
import '~/assets/stylesheets/Utility.scss';

class Header extends Component {
  constructor() {
    super();

    this.state = { showFaq: false };
    this.onToggleInstructions = this.onToggleInstructions.bind(this);
  }

  onToggleInstructions() {
    this.setState({
      showFaq: !this.state.showFaq,
    });
  }

  render() {
    const buttonText = this.state.showFaq ? 'hide faq' : 'show faq';
    const button = (
      <button className="btn btn-lrg button-item" onClick={this.onToggleInstructions}>
        {buttonText}
      </button>
    );
    const faqClass = this.state.showFaq ? 'new-section' : 'new-section hide';

    return (
      <div className="section">
          <h1>iv.finder</h1>
          determine the potential of your pokémon.<br />

          <div className="new-section">
            {button}
          </div>
          <div className={faqClass}>
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
            <div className="new-section">{button}</div>
          </div>
      </div>
    );
  }
}

export default Header;
