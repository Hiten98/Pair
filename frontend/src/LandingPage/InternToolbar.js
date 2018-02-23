import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { RaisedButton } from 'material-ui';
import history from '../history';
//import './LandingScreen.css';

class LandingScreen extends Component {
  deleteClick=()=>{
    history.push('/')
  }

  updateClick=()=>{
    history.push('/intern/user-details')
  }

  render() {
    return (
      <div style={{textAlign:'right'}}>
        <RaisedButton
          label="Delete Account"
          onClick={this.deleteClick}
        />
        <RaisedButton
          label="Update Preferences"
          onClick={this.updateClick}
        />
      </div>
    );
  }
}

export default LandingScreen;