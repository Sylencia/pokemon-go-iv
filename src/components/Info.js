import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/Utility.scss';

class Info extends Component {
  static propTypes = {
    faqContent: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    this.state = {
      changelog: false,
      faq: false,
    };
  }

  onToggleChangelog = () => {
    this.setState({
      changelog: !this.state.changelog,
      faq: false,
    });
  }

  onToggleFAQ = () => {
    this.setState({
      changelog: false,
      faq: !this.state.faq,
    });
  }

  render() {
    const { changelog, faq } = this.state;

    const changelogText = changelog ? 'hide changelog' : 'show changelog';
    const changelogButton = (
      <button className="btn btn-lrg button-item" onClick={this.onToggleChangelog}>
        {changelogText}
      </button>
    );
    const changelogClass = changelog ? 'new-section' : 'new-section hide';

    const faqText = faq ? 'hide faq' : 'show faq';
    const faqButton = (
      <button className="btn btn-lrg button-item" onClick={this.onToggleFAQ}>
        {faqText}
      </button>
    );
    const faqClass = faq ? 'new-section' : 'new-section hide';

    return (
      <span>
          {faqButton}
          {changelogButton}
          <div className={changelogClass}>
            <u>Dec 13 2016</u>
            <ul>
              <li>Added Baby Pokemon from Generation 2.</li>
              <li>Misc: Added changelog.</li>
            </ul>
            <u>Nov 22 2016</u>
            <ul>
              <li>Updated stats for latest update.</li>
            </ul>
            <u>Feb 27 2017</u>
            <ul>
              <li>Simplified site.</li>
            </ul>
            <div className="new-section">{changelogButton}</div>
          </div>
          <div className={faqClass}>
            {this.props.faqContent}
            <div className="new-section">{faqButton}</div>
          </div>
      </span>
    );
  }
}

export default Info;
