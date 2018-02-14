import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field'
import backgroundImg from './tallest-3093955_1920.jpg'
import { grey800 } from 'material-ui/styles/colors';
import { Grid, Row, Col, Image } from 'react-bootstrap'

const styles = {
  underlineStyle: {
    borderColor: grey800,
  },
  floatingLabelStyle: {
    color: '#424242',
    //fontSize:'1vw',
  },
  floatingLabelShrinkStyle: {
    color: '#000',
  },
  hintStyle: {
    color: '#424242',
    fontSize: '10vw',
  },
  visibilityIconStyle: {
    opacity: '0',
  }
}

const Login = () => {
  return (
    <div>
      <div className="info">
        <img src={backgroundImg} alt={"Building Image"} className="backgroundImg" />
      </div>
      <Grid fluid={true}>
        <Row>
          <Col className="loginForm">
            <div className="co">
              <Row className="title row-sm">
                <p>Login</p>
              </Row>
              <Row className="row-sm">
                <PasswordField
                  className="username"
                  floatingLabelText="Enter your username"
                  visible
                  disableButton={true}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                  underlineStyle={styles.underlineStyle}
                  hintStyle={styles.hintStyle}
                  visibilityIconStyle={styles.visibilityIconStyle}
                //style={{position:'fixed', top:'38%',left:'71.5%',zIndex:1}}
                />
              </Row>
              <Row className="row-sm">
                <PasswordField
                  className="password"
                  hintText="At least 8 characters"
                  floatingLabelText="Enter your password"
                  floatingLabelStyle={styles.floatingLabelStyle}
                  floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
                  underlineStyle={styles.underlineStyle}
                  visibilityIconStyle={{ opacity: '0.8' }}
                  hintStyle={styles.hintStyle}
                //style={{position:'fixed', top:'45%',left:'71.5%',zIndex:1}}
                />
              </Row>
              <Row className='row-sm'>
                <RaisedButton
                  label="Login"
                  primary={true}
                //style={{position:'fixed',top:'61%',left:'77%'}}
                />
              </Row>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
  );
}

export default Login;