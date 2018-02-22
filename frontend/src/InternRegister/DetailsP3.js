import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import HousingPreferences from './HousingPreferences.js'
import DetailsStepper from './DetailsStepper'

import history from '../history'
//import './LandingScreen.css';

class DetailsP1 extends Component {
  state={
    firstname:null,
    lastname:null,
    bio:null,
    facebook: null,
    twitter: null,
    linkedin: null,
    changed:false,
  }

  hasChanged=()=>{
    return this.state.changed
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={1} sm={2}>

          </Col>
          <Col xs={10} sm={8} className="midCol">
            <Row className="Title">Housing Preferences</Row>
            <Row>
              <DetailsStepper hasChanged={this.state.changed} pos={3}/>
            </Row>
            <Row>
              <HousingPreferences />
            </Row>
          </Col>
          <Col xs={1} sm={2}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default DetailsP1;