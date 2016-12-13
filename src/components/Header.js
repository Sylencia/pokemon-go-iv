import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/Header.scss';
import '~/assets/stylesheets/Utility.scss';
import Options from './Options';
import Info from './Info';

class Header extends Component {
  static propTypes = {
    onOptionChangeCB: PropTypes.func.isRequired,
    headerTitle: PropTypes.string.isRequired,
    faqText: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div className="section">
          <h2>{this.props.headerTitle}</h2>

          <div className="new-section">
            <Options onOptionChangeCB={this.props.onOptionChangeCB} />
            <Info faqContent={this.props.faqText} />
          </div>
      </div>
    );
  }
}

export default Header;
