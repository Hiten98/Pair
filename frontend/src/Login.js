import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import {TextField} from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field'
import backgroundImg from './tallest-3093955_1920.jpg'
import { grey800 } from 'material-ui/styles/colors';

const styles={
  underlineStyle:{
    borderColor:grey800,
  },
  floatingLabelStyle:{
    color:'#424242',
  },
  floatingLabelShrinkStyle:{
    color:'#000',
  },
  hintStyle:{
    color:'#424242',
  },
  visibilityIconStyle:{
    opacity:'0',
  }
}

const Login=()=>{
  return (
    <div>
      <div className="info">
        <img src={backgroundImg} alt={"Building Image"} className="backgroundImg"/>
      </div>
      <div className="loginForm">
        <br/>
        <br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <PasswordField 
          floatingLabelText="Enter your username"
          visible
          disableButton='true'
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
          underlineStyle={styles.underlineStyle}
          hintStyle={styles.hintStyle}
          visibilityIconStyle={styles.visibilityIconStyle}/>
        <br/>
        <PasswordField
          hintText="At least 8 characters"
          floatingLabelText="Enter your password"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
          underlineStyle={styles.underlineStyle}
          visibilityIconStyle={{opacity:'0.8'}}
          hintStyle={styles.hintStyle}/>
      </div>
    </div>
  );
}

export default Login;