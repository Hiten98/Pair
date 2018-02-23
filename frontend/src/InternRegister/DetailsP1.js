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
import axios from 'axios'
import './Details.css';

axios.defaults.baseURL = 'http://localhost:9090'


class DetailsP1 extends Component {
  state = {
    firstname: '',
    lastname: '',
    bio: '',
    facebook: '',
    twitter: '',
    linkedin: '',
    changed: false,
  }

  componentWillMount() {
    let that=this
    axios.post('/GET-PREFERENCES/BASIC-PREFERENCES', {
      "uid": this.props.uid,
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        if(response.data.firstName!=null)
        that.setState({
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          bio: response.data.description,
          facebook: response.data.fbLink,
          twitter: response.data.twitterLink,
          linkedin: response.data.linkedInLink,
        })
      }
    }).catch(function (error) {
      console.log(error);
    });

  }

  buttonSubmit = () => {
    //console.log(this.state.firstname)
    if (this.state.changed) {
      let bio = this.state.bio
      let facebook = this.state.facebook
      let twitter = this.state.twitter
      let linkedin = this.state.linkedin
      let firstname = this.state.firstname
      let lastname = this.state.lastname

      let that=this
      //console.log(firstname)
      if (lastname == '' || firstname == '') {
        alert("Missing required fields")
      } else {
        axios.post('/UPDATE-PREFERENCES/BASIC-PREFERENCES', {
          "username": this.props.uid,
          firstName: firstname,
          lastName: lastname,
          description: bio,
          fbLink: facebook,
          twitterLink: twitter,
          linkedInLink: linkedin
        }).then(function (response) {
          if (response.data.status == false) {
            console.log("Something went wrong :(")
          } else {
            console.log("Preferences updated!");
            //Go to preferences p2
            that.setState({changed:false})
          }
        }).catch(function (error) {
          console.log(error);
        });
      }

      
    }

  }

  bSubmit=()=>{
    this.buttonSubmit()
    
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
                label="Save"
                style={{ marginTop: "20px", }}
                primary
                onClick={this.buttonSubmit}
              />
              <span className="hiddenText">Th</span>
              <RaisedButton
                label="Next"
                style={{ marginTop: "20px", }}
                primary
                onClick={this.bSubmit}
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