import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import {TextField} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field'

class Login extends Component {
  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div className="info">
        </div>
        <div className="loginForm">
          <PasswordField
            hintText="At least 8 characters"
            floatingLabelText="Enter your password"
            errorText="Your password is too short"/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;