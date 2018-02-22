import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import RegisterParagraph from './RegisterParagraph.js'
import RegisterForm from './RegisterForm.js'
//import './Register.css';

class Register extends Component {
  render() {
    return (
      <Grid fluid={true}>
      <Row>
        <Col xsHidden={true} sm={8}>
          <RegisterParagraph />
        </Col>
        <RegisterForm updateUid={this.props.updateUid}/>
      </Row>
    </Grid>
    );
  }
}

export default Register;