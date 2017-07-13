import React, { Component, PropTypes } from 'react';
import '~/assets/stylesheets/Utility.scss';
import '~/assets/stylesheets/App.scss';

import IVFinder from './IVFinder/IVFinder';
import Minmax from './Minmax/Minmax';
import Multi from './Multi/Multi';

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      component: 'solo',
    };
  }

  changeComponent = (e) => {
    this.setState({
      component: e.target.name,
    });
  }

  render() {
    const { component } = this.state;
    let mainArea = <IVFinder />;
    if (component === 'solo') {
      mainArea = <IVFinder />;
    } else if (component === 'multi') {
      mainArea = <Multi />;
    } else if (component === 'minmax') {
      mainArea = <Minmax />;
    }
    return (
      <div>
        <div className="header">
          <span className="header-item">
            <a name="solo" onClick={this.changeComponent}>iv.solo</a> //&nbsp;
            <a name="multi" onClick={this.changeComponent}>iv.multi</a> //&nbsp;
            <a name="minmax" onClick={this.changeComponent}>iv.minmax</a>
          </span>
          <span className="float-right mr-10">
            by <a href="http://www.reddit.com/u/sylencia">sylencia</a>
          </span>
        </div>
        <div className="filler"></div>
        {mainArea}
        <div className="footer">
          <span className="footer-item">
            last updated: 27 feb 2017
          </span>
        </div>
      </div>
    );
  }
}

export default App;
