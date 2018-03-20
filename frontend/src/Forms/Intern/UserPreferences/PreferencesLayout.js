import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../../../history'
import UserDetailsForm from './UserDetails/UserDetailsForm'
import UserPreferencesStepper from './UserPreferencesStepper'
import HousingPreferencesForm from './HousingPreferences/HousingPreferencesForm'
import './PreferencesLayout.css'
import RoommatePreferencesForm from './RoommatePreferences/RoommatePreferencesForm';

class PreferencesLayout extends Component {
  constructor(props) {
    super(props)
    if (this.props.uid == null) {
      //history.push('/home/login')
    }

    let tempPage = 0
    let path = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)
    if (path == 'user-details') {
      tempPage = 1
    } else if (path == 'roommate') {
      tempPage = 2
    } else if (path == 'housing') {
      tempPage = 3
    } else {
      alert("Error: something happened, please try again")
      history.push('/home/login')
    }
    this.state = {
      currPage: tempPage,
      completed: [],
      changed: false,
    }

    try {
      const serializedState = localStorage.getItem('preferences')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('preferences', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  changePage = (page) => {
    this.changeChanged(false)
    this.setState({ currPage: page }, () => { this.saveState() })
  }

  changeChanged = (v) => {
    this.setState({ changed: v }, () => { this.saveState() })
  }

  title = () => {
    if (this.state.currPage === 1) {
      return "User Details"
    } else if (this.state.currPage === 2) {
      return "Roommate Preferences"
    } else if (this.state.currPage === 3) {
      return "Housing Preferences"
    }
  }

  changeCompleted = (i) => {
    let tempList = this.state.completed
    tempList.push(i)
    this.setState({ completed: tempList }, () => { this.saveState() })
  }

  render() {
    let toPass = {
      uid: this.props.uid,
      changePage: this.changePage,
      changeChanged: this.changeChanged,
      changed: this.props.changed,
      completed: this.state.completed,
      changeCompleted: this.changeCompleted,
    }
    return (
      <div>
        <Row className='preferences-title'>
          {this.title()}
        </Row>

        <UserPreferencesStepper pos={this.state.currPage} changed={this.state.changed} changeChanged={this.changeChanged} changePage={this.changePage} />

        <Switch>
          <Route path="/register/intern/preferences/user-details" render={() => <UserDetailsForm {...toPass} />} />
          <Route path="/register/intern/preferences/roommate" render={() => <RoommatePreferencesForm {...toPass} />} />
          <Route path="/register/intern/preferences/housing" render={() => <HousingPreferencesForm {...toPass} />} />
          <Route path="/" render={() => <Redirect to='/home/login' />} />
        </Switch>
      </div>
    );
  }
}

export default PreferencesLayout;