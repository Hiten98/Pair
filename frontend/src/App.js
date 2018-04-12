import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import WelcomeScreen from './WelcomeScreen.js'
import LandingScreen from './Landing/MainLanding'
import { Grid } from 'react-bootstrap'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { black } from 'material-ui/styles/colors';
import RegisterLayout from './Forms/RegisterLayout'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      type: null,
      company: null,
      locations: null,
    }
    try {
      const serializedState = localStorage.getItem('app')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  muiTheme = getMuiTheme({
    palette: {
      primary1Color: black,
    }
  });

  componentDidMount = () => {
    window.addEventListener("resize", () => {
      if (!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent)))
        this.forceUpdate()
    })
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('app', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  updateCompany = (company) => {
    //console.log(company)
    this.setState({ company: company }, () => { this.saveState() })
    this.saveState()
  }

  updateLocations = (locations) => {
    this.setState({ locations: locations }, () => { this.saveState() })
    //console.log(locations)
    this.saveState()
  }

  updateUid = (uid, authority) => {
    //console.log(uid)
    //console.log("hi")
    this.setState({ uid: uid }, () => { this.saveState() })
    this.setState({ type: authority }, () => { this.saveState() })
    this.saveState()
  }

  //updateUid("hi","")
  //console.log(state.uid)
  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        <Grid className="App fluid">
          <Switch>
            <Route path='/home' render={() => <WelcomeScreen updateUid={this.updateUid} updateCompany={this.updateCompany} updateLocations={this.updateLocations} />} />
            <Route path='/landing' render={() => <LandingScreen uid={this.state.uid} type={this.state.type} />} />
            <Route path='/register' render={() => <RegisterLayout company={this.state.company} uid={this.state.uid} locations={this.state.locations} updateUid={this.updateUid} />} />
            <Route path="/" render={() => <Redirect to='/home/login' />} />
          </Switch>
        </Grid>
      </MuiThemeProvider>
    );
  }
}

export default App;
