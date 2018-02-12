import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './LandingScreen.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="App">
          <Switch>
            <Route path='/' component={WelcomeScreen}/>
            <Route path='/home' component={LandingScreen}/>
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
