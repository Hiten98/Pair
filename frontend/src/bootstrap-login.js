import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import backgroundImg from './tallest-3093955_1920.jpg'
import LoginParagraph from './loginParagraph.js'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Form from './form.js'



const Login = () => {
  return (
    <Grid fluid={true}>
      <Row>
        <Col xsHidden={true} sm={8}>
          <LoginParagraph />
        </Col>
        <Form/>
      </Row>
    </Grid>
  );
}

export default Login;