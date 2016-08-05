import React, { Component } from 'react';
import '~/assets/stylesheets/Header.scss';
import '~/assets/stylesheets/Utility.scss';

class MultiHeader extends Component {
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
          <h1>iv.multi</h1>
          determine a pokémon's potential faster in a group.<p />
          <b>this only works for wild pokémon that have been caught in the same spot (and not
          via incense).</b>

          <div className="new-section">
            {button}
          </div>
          <div className={faqClass}>
            faq coming soon
            <div className="new-section">{button}</div>
          </div>
      </div>
    );
  }
}

export default MultiHeader;
