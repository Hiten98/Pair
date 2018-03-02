import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import history from '../../../history'
import UserDetailsForm from './UserDetails/UserDetailsForm'
import UserPreferencesStepper from './UserPreferencesStepper'
import './PreferencesLayout.css'
import RoommatePreferencesForm from './RoommatePreferences/RoommatePreferencesForm';

class PreferencesLayout extends Component {
  constructor(props) {
    super(props)
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
      completed:[],
      changed:false,
    }
  }

  changePage=(page)=>{
    this.changeChanged(false)
    this.setState({currPage:page})
  }

  changeChanged=(v)=>{
    this.setState({changed:v})
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

  render() {
    return (
      <div>
        <Row className='preferences-title'>
          {this.title()}
        </Row>

        <UserPreferencesStepper pos={this.state.currPage} changed={this.state.changed} changeChanged={this.changeChanged} changePage={this.changePage}/>

        <Switch>
          <Route path="/register/intern/preferences/user-details" render={()=><UserDetailsForm uid={this.props.uid} changePage={this.changePage} changeChanged={this.changeChanged}/>}/>
          <Route path="/register/intern/preferences/roommate" render={()=><RoommatePreferencesForm uid={this.props.uid} changePage={this.changePage} changeChanged={this.changeChanged}/>}/>
          <Route path="/register/intern/preferences/housing" />
        </Switch>
      </div>
    );
  }
}

export default PreferencesLayout;