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


class DetailsP2 extends Component {
  state = {
    youguest: null,
    themguest: null,
    youpet: null,
    thempet: null,
    sharing: null,
    smoke: null,
    bedtime: null,
    waketime: null,
    lights: null,
    clean: null,
    changed: false,
  }

  constructor(props) {
    super(props)


    /**/
  }

  componentWillMount() {
    //KUNAL PUT CODE HERE to get preferences from server
    //put them in the nulls that are below
    this.setState({
      youguest: null,
      themguest: null,
      youpet: null,
      thempet: null,
      sharing: null,
      smoke: null,
      bedtime: null,
      waketime: null,
      lights: null,
      clean: null,
    })
  }

  bSubmit = () => {
    if (this.state.changed) {
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

      //KUNAL PUT CODE HERE to submit the page to the server
      //dont forget to check that all are not null
    }
  }

  backButtonSubmit = () => {
    this.bSubmit()
    history.push('/intern/user-details')
  }

  buttonSubmit = () => {
    this.bSubmit()
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
                <hr/>
                <Row>
                  <Lights changing={this.lightChange.bind(this)} dv={this.state.lights} />
                </Row>
                <hr/>
                <Row>
                  <Sharing changing={this.shareChange.bind(this)} dv={this.state.sharing} />
                </Row>
                <hr/>
                <Row>
                  <YouGuest changing={this.youguestChange.bind(this)} dv={this.state.youguest} />
                </Row>
                <hr/>
                <Row>
                  <YouPet changing={this.youpetChange.bind(this)} dv={this.state.youpet} />
                </Row>
              </Col>

              <Col xs={6}>
                <Row>
                  <Waketime changing={this.waketimeChange.bind(this)} dv={this.state.waketime} />
                </Row>
                <hr/>
                <Row>
                  <Clean changing={this.cleanChange.bind(this)} dv={this.state.clean} />
                </Row>
                <hr/>
                <Row>
                  <Smoke changing={this.smokeChange.bind(this)} dv={this.state.smoke} />
                </Row>
                <hr/>
                <Row>
                  <ThemGuest changing={this.themguestChange.bind(this)} dv={this.state.themguest} />
                </Row>
                <hr/>
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