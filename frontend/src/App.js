import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './LandingScreen.js'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'
import { black, grey700, pink500, green900, white, blue500, pink700 } from 'material-ui/styles/colors';


const muiTheme=getMuiTheme({
  palette:{
    primary1Color:black,
  }
});

const App=()=>{
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App">
        <Switch>
          <Route path='/' component={WelcomeScreen}/>
          <Route path='/home' component={LandingScreen}/>
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
