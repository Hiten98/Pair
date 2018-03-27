import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton } from 'material-ui';
import history from '../history';
//import './LandingScreen.css';
import axios from 'axios'

axios.defaults.baseURL = "localhost:9090";

class LandingScreen extends Component {
  deleteClick = () => {
    //KUNAL ADD DELETE FUNCTIONALITY
    axios.post('/REMOVE-USER', {
      "userID": this.props.uid
    }).then(function (response) {
      console.log(response.data)
      if (response.data.status = "SUCCESS") {
        //Tell them it was successful
        //Take them to the login page
        alert("Success")
        localStorage.setItem('uid', "")
        localStorage.setItem('moderator', '')
        history.push('/')
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  changePassword=()=>{
    history.push('/register/intern/part1')
  }

  updateClick = () => {
    history.push('/intern/user-details')
  }

  render() {
    return (
      <div style={{ textAlign: 'right' }}>
        <RaisedButton
          label='Change Password'
          onClick={this.changePassword}
        />
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