import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import DetailsStepper from './DetailsStepper'
import { RaisedButton } from 'material-ui';
import PriceInput from './HousingInputs/PriceInput'
import DistanceInput from './HousingInputs/DistanceInput'
import DurationInput from './HousingInputs/DurationInput'
import RoommatesInput from './HousingInputs/RoommatesInput'

import history from '../history'
//import './LandingScreen.css';

class DetailsP1 extends Component {
  state = {
    price: null,
    roommates: null,
    distance: null,
    duration: null,
    changed: false,
  }

  componentWillMount() {
    //KUNAL PUT CODE HERE to get preferences from server
    //put them in the nulls that are below
    this.setState({
      price: null,
      roommates: null,
      distance: null,
      duration: null,
    })
  }

  bSubmit = () => {
    if (this.state.changed) {
      let price = this.state.price
      let roommates = this.state.roommates
      let distance = this.state.distance
      let duration = this.state.duration

      //KUNAL PUT CODE HERE to submit the page to the server
      //dont forget to check that all are not null
    }
  }

  distanceChange=(distance)=>{
    this.setState({distance})
  }

  priceChange=(price)=>{
    this.setState({price})
  }

  durationChange=(duration)=>{
    this.setState({duration})
  }

  roommateChange=(roommates)=>{
    this.setState({roommates})
  }

  backButtonSubmit = () => {
    this.bSubmit()
    history.push('/intern/roommate-preferences')
  }

  buttonSubmit = () => {
    this.bSubmit()
    history.push('/intern-landing/chats')
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
              <DetailsStepper hasChanged={this.state.changed} pos={3} />
            </Row>
            <Row>
              <Col xs={6}>
                <PriceInput dv={this.state.price} changing={this.priceChange.bind(this)} />
              </Col>
              <Col xs={6}>
                <DistanceInput dv={this.state.distance} changing={this.distanceChange.bind(this)} />
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <DurationInput dv={this.state.price} changing={this.durationChange.bind(this)} />
              </Col>
              <Col xs={6}>
                <RoommatesInput dv={this.state.distance} changing={this.roommateChange.bind(this)} />
              </Col>
            </Row>
            <Row className="notThis">
              <RaisedButton
                label="Previous"
                sytle={{ marginTop: "20px" }}
                primary
                onClick={this.backButtonSubmit}
              />
              <span className="hiddenText">Th</span>

              <RaisedButton
                label="Submit"
                style={{ marginTop: "20px", }}
                primary
                onClick={this.buttonSubmit}
              />
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