import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import {TextField} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field'
import backgroundImg from './tallest-3093955_1920.jpg'

class Login extends Component {
  render() {
    return (
      <div>
        <div className="info">
          <img src={backgroundImg} alt={"Building Image"} className="backgroundImg"/>
        </div>
        <div className="loginForm">
          <PasswordField
            hintText="At least 8 characters"
            floatingLabelText="Enter your password"
            color="#000"/>
        </div>
      </div>
    );
  }
}

export default Login;