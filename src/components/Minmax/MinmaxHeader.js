import React, { Component } from 'react';
import '~/assets/stylesheets/Header.scss';
import '~/assets/stylesheets/Utility.scss';

class MinmaxHeader extends Component {
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
          <h1>iv.minmax</h1>
          a quick reference to a pokémon's potential.

          <div className="new-section">
            {button}
          </div>
          <div className={faqClass}>
            <h5><u>what is this?</u></h5>
            this page is used for quick referencing how good your pokémon is. when you are out and
            about, there's no time to manually enter each pokémon's stats, so this will give you
            a rough estimate as to wheter it's closer to the lower or higher end of the spectrum.
            <h5><u>what about hatched pokémon?</u></h5>
            hatched pokémon have a maximum level of 39. there may be a toggle later to help you
            keep track of that.
            <div className="new-section">{button}</div>
          </div>
      </div>
    );
  }
}

export default MinmaxHeader;
