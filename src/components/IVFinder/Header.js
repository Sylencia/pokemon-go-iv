import React, { Component } from 'react';
import '~/assets/stylesheets/IVFinder/Header.scss';
import '~/assets/stylesheets/utility.scss';

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
    const instructions = this.state.showFaq ? (
      <div className="new-section">
        <h5><u>what are ivs?</u></h5>
        ivs are hidden stats which are assigned to each pokémon you have caught or hatched.<br />
        the three stats ivs are assigned for are: stamina(hp), attack and defense.<br />
        each iv ranges between 0 and 15, thus having 15 for each iv is considered a 'perfect
        pokémon'.<p />
        <h5><u>what do i input for the pokémon's name?</u></h5>
        for most pokémon, the name is easy. however, there are some weird ones.<br />
        <b>names to lookout for:</b> nidoran-f, nidoran-m, mr. mime, farfetch'd<br />
        note that the name input is not case sensitive.
        <h5><u>what do i put for 'dust'?</u></h5>
        on the pokémon's status screen, there's a button that lets you power it up for a cost.<br />
        simply fill in the amount of dust that it requires you to use to power it up.
        <h5><u>what is 'untrained wild'?</u></h5>
        pokémon that were caught in the wild have odd numbered levels. having this ticked means that
        we only consider odd numbered levels for your pokémon.<br />
        <b>untick if:</b> you hatched the pokémon or you have used 'power up' on your pokémon.
        <h5><u>what is 'filter'?</u></h5>
        if you power up your pokémon, you can use that information along with the previous stats
        that you entered to get a more narrow result. for most pokémon you will need to do this a
        few times to get the exact number.<br />
        <h5><u>what is 'perfection'?</u></h5>
        perfection shows how close to perfect you are to having the best possible pokémon. due to
        the way the stats are calculated, <b>attack ivs</b> are weighted more heavily than&nbsp;
        <b>stamina and defense ivs</b> when determining perfection.
        <div className="new-section">{button}</div>
      </div>
    ) : '';

    return (
      <div className="section">
          <h1>iv.finder</h1>
          determine your pokémon's ivs in pokémon go, on the go.<br />
          made by <a href="http://www.reddit.com/u/sylencia">sylencia</a>

          <div className="new-section">
            {button}
          </div>
          {instructions}
      </div>
    );
  }
}

export default Header;
