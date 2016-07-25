import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { render } from 'react-dom';
import App from './components/App';
import IVFinder from './components/IVFinder/IVFinder';
import Minmax from './components/Minmax/Minmax';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IVFinder} />
      <Route path="finder" component={IVFinder} />
      <Route path="minmax" component={Minmax} />
    </Route>
  </Router>
);

render(<AppRouter />, document.getElementById('root'));
