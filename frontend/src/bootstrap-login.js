import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
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