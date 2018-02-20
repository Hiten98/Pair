import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './Login.css';
import LoginParagraph from './loginParagraph.js'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Form from './form.js'



class Login extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xsHidden={true} sm={8}>
            <LoginParagraph />
          </Col>
          <Form updateUid={this.props.updateUid} />
        </Row>
      </Grid>
    );
  }
}

export default Login;