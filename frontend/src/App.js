import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './LandingScreen.js'
import { Grid } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { black } from 'material-ui/styles/colors';
import RegisterLayout from './Forms/RegisterLayout'
import './App.css';



const muiTheme = getMuiTheme({
  palette: {
    primary1Color: black,
  }
});

const state = {
  uid: null,
  type: null,
  company: null,
  locations: null,
}

const updateCompany = (company) => {
  state.company = company
}

const updateLocations = (locations) => {
  state.locations = locations
}

const updateUid = (uid) => {
  state.uid = uid;
  if (uid.charAt(0) == 4) {
    state.type = "admin"
  } if (uid.charAt(0) == 3) {
    state.type = "company"
  } else if (uid.charAt(0) == 2) {
    //GO TO EMPLOYEE Landing Page
    state.type = "employee"
  } else if (uid.charAt(0) == 1) {
    state.type = "intern"
  }
}

const App = () => {
  //updateUid("hi","")
  //console.log(state.uid)
  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <Grid className="App">
        <Switch>
          <Route exact path="/" render={() => <Redirect to='/home/login' />} />
          <Route path='/home' render={() => <WelcomeScreen updateUid={updateUid} updateCompany={updateCompany} updateLocations={updateLocations} />} />
          <Route path='/landing' component={LandingScreen} uid={state.uid} type={state.type} />
          <Route path='/register' render={() => <RegisterLayout company={state.company} locations={state.locations} updateUid={updateUid} />} />
        </Switch>
      </Grid>
    </MuiThemeProvider>
  );
}

export default App;
