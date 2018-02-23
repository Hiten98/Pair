import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import SelfPreferences from './SelfPreferences.js'
import HousingPreferences from './HousingPreferences.js'
import RoommatePreferences from './RoommatePreferences.js'
//import './LandingScreen.css';

class LandingScreen extends Component {
  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={1} sm={2}>

          </Col>
          <Col xs={10} sm={8} className="midCol">
            <Row className="Title"> Intern Preferences</Row>
            <Row>
              <SelfPreferences />
            </Row>
            <Row>
              <HousingPreferences />
            </Row>
            <Row>
              <RoommatePreferences />
            </Row>
            </Col>
          <Col xs={1} sm={2}>

          </Col>
        </Row>
      </Grid>
    );
  }
}

export default LandingScreen;