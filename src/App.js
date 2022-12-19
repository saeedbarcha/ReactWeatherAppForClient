import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css';

import Current from './Pages/Current'
import Fivedays from './Pages/Fivedays'
function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path='/'>
            <Current/>
          </Route>
          <Route exact path='/Current'>
            <Current/> 
          </Route>
          <Route exact path='/Fivedays'>
            <Fivedays/>
          </Route>
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
