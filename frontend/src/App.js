import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './LandingScreen.js'
import { Grid } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { black } from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
  }
});

const state = {
  uid: null,
  type: null,
  company:null,
  locations:null,
}

const updateCompany=(company)=>{
  state.company=company
}

const updateLocations=(locations)=>{
  state.locations=locations
}

const updateUid = (uid, type) => {
  state.uid = uid;
  state.type = type;
}

const App = () => {
  //updateUid("hi","")
  //console.log(state.uid)
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Grid className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to='/home/login' />} />
          <Route path='/home' render={() => <WelcomeScreen updateUid={updateUid} updateCompany={updateCompany} updateLocations={updateLocations}/>} />
          <Route path='/landing' component={LandingScreen} uid={state.uid} type={state.type} />
        </Switch>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
