import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Firstname from '../EmployeeRegisterForm/Firstname'
import Lastname from '../EmployeeRegisterForm/Lastname'
import Bio from '../EmployeeRegisterForm/Description'
import FacebookLink from '../EmployeeRegisterForm/FacebookLink'
import TwitterLink from '../EmployeeRegisterForm/TwitterLink'
import LinkedInLink from '../EmployeeRegisterForm/LinkedInLink'
import DetailsStepper from './DetailsStepper'
import { grey800, black, pink900, white } from 'material-ui/styles/colors';
import { Checkbox, RaisedButton } from 'material-ui';

import history from '../history'
//import './LandingScreen.css';

class DetailsP1 extends Component {
  state = {
    firstname: null,
    lastname: null,
    bio: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    changed: false,
  }

  constructor(props) {
    super(props)
    //KUNAL PUT CODE HERE to get preferences from server
    //put them in the nulls that are below
    this.setState({
      firstname: null,
      lastname: null,
      bio: null,
      facebook: null,
      twitter: null,
      linkedin: null,
    })
  }

  buttonSubmit = () => {
    if (this.state.changed) {
      let bio = this.state.bio
      let facebook = this.state.facebook
      let twitter = this.state.twitter
      let linkedin = this.state.linkedin
      let firstname = this.state.firstname
      let lastname = this.state.lastname

      //KUNAL PUT CODE HERE to submit the page to the server
      //dont forget to check that firstname, and lastname are not null
    }
    history.push('/intern/roommate-preferences')
  }

  firstnameChange = (ev) => {
    this.setState({ firstname: ev.target.value, changed: true })
  }

  lastnameChange = (ev) => {
    this.setState({ lastname: ev.target.value, changed: true })
  }

  bioChange = (ev) => {
    this.setState({ bio: ev.target.value, changed: true })
  }

  faceChange = (ev) => {
    this.setState({ facebook: ev.target.value, changed: true })
    //console.log(this.state.facebook)
  }

  linkedChange = (ev) => {
    this.setState({ linkedin: ev.target.value, changed: true })
    //console.log(this.state.linkedin)
  }

  twitterChange = (ev) => {
    this.setState({ twitter: ev.target.value, changed: true })
    //console.log(this.state.twitter)
  }

  styles = {
    underlineStyle: {
      borderColor: black,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelShrinkStyle: {
      color: black,
    },
    hintStyle: {
      color: grey800,
      fontWeight: "bold",
      textAlign: 'left',
    },
    visibilityIconStyle: {
      opacity: '0',
    },
    teztfietextFieldStyle: {
      borderBottomColor: black,
      fontWeight: "bold",
    }
  }

  render() {
    return (
      <Grid fluid={true}>
        <Row>
          <Col xs={1} sm={2}>

          </Col>
          <Col xs={10} sm={8} className="midCol">
            <Row className="Title">User Details</Row>
            <Row>
              <DetailsStepper hasChanged={this.state.changed} pos={1} />
            </Row>
            <Row>
              <Firstname styles={this.styles} fnameChange={this.firstnameChange.bind(this)} dv={this.state.firstname} />
            </Row>
            <Row>
              <Lastname styles={this.styles} lnameChange={this.lastnameChange.bind(this)} dv={this.state.lastname} />
            </Row>
            <Row>
              <Bio styles={this.styles} descriptionChange={this.bioChange.bind(this)} dv={this.state.bio} />
            </Row>
            <Row>
              <LinkedInLink styles={this.styles} linkedChange={this.linkedChange.bind(this)} dv={this.state.linkedin} />
            </Row>
            <Row>
              <FacebookLink styles={this.styles} faceChange={this.faceChange.bind(this)} dv={this.state.facebook} />
            </Row>
            <Row>
              <TwitterLink styles={this.styles} twitterChange={this.twitterChange.bind(this)} dv={this.state.twitter} />
            </Row>
            <Row className="notThis">
              <RaisedButton
                label="Next"
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