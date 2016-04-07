import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import TeemoScout from './containers/TeemoScout';
import FuelSavingsPage from './containers/FuelSavingsPage';
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={FuelSavingsPage} />
    <Route path="about" component={AboutPage}/>
    <Route path="TeemoScout" component={TeemoScout}/>
    <Route path="*" component={NotFoundPage} />
  </Route>
);
