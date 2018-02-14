import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { TextField, RaisedButton } from 'material-ui'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import PasswordField from 'material-ui-password-field'
import backgroundImg from './tallest-3093955_1920.jpg'
import { grey800, black } from 'material-ui/styles/colors';
import { Grid, Row, Col, Image } from 'react-bootstrap'

const styles = {
  underlineStyle: {
    borderColor: grey800,
  },
  floatingLabelStyle: {
    color: grey800,
  },
  floatingLabelShrinkStyle: {
    color: black,
  },
  hintStyle: {
    color: grey800,
    fontSize: '10vw',
    textAlign: 'left',
  },
  visibilityIconStyle: {
    opacity: '0',
  }
}

const Login = () => {
  return (
    <Grid fluid={true}>
      <Row>
        <Col xsHidden={true} sm={8}>

        </Col>
        <Col xs={12} sm={4} md={4} className="loginForm">
          <div className="co">
            <Row className="title row-sm">
              Login
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
              />
            </Row>
            <Row className='row-sm'>
              <RaisedButton
                label="Login"
                primary={true}
              />
            </Row>
            <Row className="row-sm item">
              hello
            </Row>
          </div>
        </Col>
      </Row>
    </Grid>
  );
}

export default Login;