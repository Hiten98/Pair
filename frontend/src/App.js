import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './LandingScreen.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path='/' component={WelcomeScreen}/>
          <Route path='/home' component={LandingScreen}/>
        </Switch>
      </div>
    );
  }
}

export default App;
