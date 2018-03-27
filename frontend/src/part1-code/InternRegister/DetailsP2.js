import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import DetailsStepper from './DetailsStepper'
import history from '../history'
import { RaisedButton } from 'material-ui';
import './Details.css';
import YouGuest from './RoommateInputs/YouGuestInput'
import ThemGuest from './RoommateInputs/ThemGuestInput'
import Bedtime from './RoommateInputs/BedtimeInput'
import Clean from './RoommateInputs/CleanInput'
import Lights from './RoommateInputs/LightsInput'
import Sharing from './RoommateInputs/SharingInput'
import Smoke from './RoommateInputs/SmokeInput'
import ThemPet from './RoommateInputs/ThemPetInput'
import Waketime from './RoommateInputs/WaketimeInput'
import YouPet from './RoommateInputs/YouPetInput'
import ImageUpload from '../EmployeeRegisterForm/ImageUpload'
import axios from 'axios'

axios.defaults.baseURL = "localhost:9090";


class DetailsP2 extends Component {
  state = {
    youguest: 1,
    themguest: 1,
    youpet: 1,
    thempet: 1,
    sharing: 1,
    smoke: 1,
    bedtime: 21,
    waketime: 9,
    lights: 1,
    clean: 1,
    changed: false,
  }

  componentWillMount() {
    let that = this
    //KUNAL PUT CODE HERE to get preferences from server
    //put them in the nulls that are below
    axios.post('/GET-PREFERENCES/ROOMMATE-PREFERENCES', {
      "userID": this.props.uid
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        if (response.data.smoke != null)
          that.setState({
            youguest: response.data.youguest,
            themguest: response.data.themguest,
            youpet: response.data.youpet,
            thempet: response.data.thempet,
            sharing: response.data.sharing,
            smoke: response.data.smoke,
            bedtime: response.data.bedtime,
            waketime: response.data.waketime,
            lights: response.data.lights,
            clean: response.data.clean,
          })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  bSubmit = () => {

    let youguest = this.state.youguest
    let themguest = this.state.themguest
    let youpet = this.state.youpet
    let thempet = this.state.thempet
    let sharing = this.state.sharing
    let smoke = this.state.smoke
    let bedtime = this.state.bedtime
    let waketime = this.state.waketime
    let lights = this.state.lights
    let clean = this.state.clean

    //console.log("state"+this.state.uid)
    console.log("props"+this.props.uid)

    let that = this
    axios.post('/UPDATE-PREFERENCES/ROOMMATE-PREFERENCES', {
      "userID": this.props.uid,
      "youguest": youguest,
      "themguest": themguest,
      "youpet": youpet,
      "thempet": thempet,
      "sharing": sharing,
      "smoke": smoke,
      "bedtime": bedtime,
      "waketime": waketime,
      "lights": lights,
      "clean": clean
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Preferences updated!");
        //Go to preferences p3
        that.setState({ changed: false })
      }
    }).catch(function (error) {
      console.log(error);
    });

    //KUNAL PUT CODE HERE to submit the page to the server
    //dont forget to check that all are not null

  }

  backButtonSubmit = () => {
    this.bSubmit()
    if (!this.state.changed)
      history.push('/intern/user-details')
  }

  buttonSubmit = () => {
    this.bSubmit()
    if (!this.state.changed)
      history.push('/intern/housing-preferences')
  }

  bedtimeChange = (bedtime) => {
    this.setState({ bedtime })
    //console.log(this.state.bedtime)
  }

  waketimeChange = (waketime) => {
    this.setState({ waketime })
  }

  lightChange = (lights) => {
    this.setState({ lights })
  }

  cleanChange = (clean) => {
    this.setState({ clean })
  }

  shareChange = (sharing) => {
    this.setState({ sharing })
  }

  smokeChange = (smoke) => {
    this.setState({ smoke })
  }

  youguestChange = (youguest) => {
    this.setState({ youguest })
  }

  youpetChange = (youpet) => {
    this.setState({ youpet })
  }

  themguestChange = (themguest) => {
    this.setState({ themguest })
  }

  thempetChange = (thempet) => {
    this.setState({ thempet })
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
              <DetailsStepper hasChanged={this.state.changed} pos={2} />
            </Row>
            <Row>
              <Col xs={6}>
                <Row>
                  <Bedtime changing={this.bedtimeChange.bind(this)} dv={this.state.bedtime} />
                </Row>
                <hr />
                <Row>
                  <Lights changing={this.lightChange.bind(this)} dv={this.state.lights} />
                </Row>
                <hr />
                <Row>
                  <Sharing changing={this.shareChange.bind(this)} dv={this.state.sharing} />
                </Row>
                <hr />
                <Row>
                  <YouGuest changing={this.youguestChange.bind(this)} dv={this.state.youguest} />
                </Row>
                <hr />
                <Row>
                  <YouPet changing={this.youpetChange.bind(this)} dv={this.state.youpet} />
                </Row>
              </Col>

              <Col xs={6}>
                <Row>
                  <Waketime changing={this.waketimeChange.bind(this)} dv={this.state.waketime} />
                </Row>
                <hr />
                <Row>
                  <Clean changing={this.cleanChange.bind(this)} dv={this.state.clean} />
                </Row>
                <hr />
                <Row>
                  <Smoke changing={this.smokeChange.bind(this)} dv={this.state.smoke} />
                </Row>
                <hr />
                <Row>
                  <ThemGuest changing={this.themguestChange.bind(this)} dv={this.state.themguest} />
                </Row>
                <hr />
                <Row>
                  <ThemPet changing={this.thempetChange.bind(this)} dv={this.state.thempet} />
                </Row>
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
                label="Save"
                style={{ marginTop: "20px", }}
                primary
                onClick={this.bSubmit}
              />
              <span className="hiddenText">Th</span>
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

export default DetailsP2;
