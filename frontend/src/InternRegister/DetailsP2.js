import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import RoommatePreferences from './RoommatePreferences.js'
import DetailsStepper from './DetailsStepper'

import history from '../history'
//import './LandingScreen.css';

class DetailsP2 extends Component {
  state={
    youguest:null,
    themguest:null,
    youpet:null,
    thempet:null,
    sharing:null,
    smoke:null,
    bedtime:null,
    waketime:null,
    lights:null,
    clean:null,
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
            <Row className="Title">Roommate Preferences</Row>
            <Row>
              <DetailsStepper hasChanged={this.state.changed} pos={2}/>
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

export default DetailsP2;