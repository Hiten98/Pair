import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import './NewEmployeeRegister.css';
import logo from './images/original_logo.png'

//needed in here
//email
//password
//where they want to moderate
//profile pic
//description
//links

class NewEmployeeRegister extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xsHidden={true} sm={2}>
          
          </Col>
          <Col xs={12} sm={8} className="midCol">
            
            
          </Col>
          <Col xsHidden sm={2}>
          
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default NewEmployeeRegister;