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
            <Link to="/solo">iv.solo</Link> //&nbsp;
            <Link to="/multi">iv.multi</Link> //&nbsp;
            <Link to="/minmax">iv.minmax</Link>
          </span>
          <span className="float-right mr-10">
            by <a href="http://www.reddit.com/u/sylencia">sylencia</a>
          </span>
        </div>
        <div className="filler"></div>
        {this.props.children}
        <div className="footer">
          <span className="footer-item">
            last updated: 13 december 2016
          </span>
        </div>
      </div>
    );
  }
}

export default App;
