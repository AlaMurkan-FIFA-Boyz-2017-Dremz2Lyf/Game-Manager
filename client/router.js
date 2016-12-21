import Main from './components/Main.jsx';
import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

const routes = (
  <Router history={browserHistory}>
    <Route path='/' component={Main}>

    </Route>
  </Router>
)

module.exports = routes
