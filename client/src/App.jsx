import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DetailedView from './components/detailed_view';
import ReportingSystem from './components/homePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={ReportingSystem} />
        <Route path='/detailed_view' component={DetailedView} />
      </Switch>
    </Router>
  );
};
export default App;
