import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import '~/assets/stylesheets/Utility.scss';
import '~/assets/stylesheets/App.scss';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  render() {
    return (
      <div>
        <div className="header">
          <span className="header-item">
            <Link to="/finder">iv.finder</Link> //&nbsp;
            <Link to="/minmax">iv.minmax</Link> //&nbsp;
            <span data-tooltip="coming soon" className="tooltip tooltip-bottom">iv.multi</span>
          </span>
          <span className="float-right mr-10">
            by <a href="http://www.reddit.com/u/sylencia">sylencia</a>
          </span>
        </div>
        <div className="filler"></div>
        {this.props.children}
      </div>
    );
  }
}

export default App;
