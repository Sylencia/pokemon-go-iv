import React from 'react';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { render } from 'react-dom';
import App from './components/App';
import IVFinder from './components/IVFinder/IVFinder';
import Minmax from './components/Minmax/Minmax';
import Multi from './components/Multi/Multi';

const AppRouter = () => (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={IVFinder} />
      <Redirect from="finder" to="solo" />
      <Route path="solo" component={IVFinder} />
      <Route path="minmax" component={Minmax} />
      <Route path="multi" component={Multi} />
    </Route>
  </Router>
);

render(<AppRouter />, document.getElementById('root'));
