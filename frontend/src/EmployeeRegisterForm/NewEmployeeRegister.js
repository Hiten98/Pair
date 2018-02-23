import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import './NewEmployeeRegister.css';
import { Checkbox, RaisedButton } from 'material-ui';
import PasswordField from 'material-ui-password-field'
import { grey800, black, pink900, white } from 'material-ui/styles/colors';
import Username from './Username.js'
import Password from './password.js';
import Description from './Description';
import hiistory from '../history.js'
import ImageUpload from './ImageUpload.js'
import TwitterLink from './TwitterLink.js'
import FacebookLink from './FacebookLink'
import LinkedInLink from './LinkedInLink'
import Firstname from './Firstname'
import Lastname from './Lastname'
import history from '../history'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'


//needed in here
//email
//password
//where they want to moderate
//profile pic
//description
//links

class NewEmployeeRegister extends Component {
  state = {
    username: null,
    password: null,
    checked: [],
    description: null,
    facebook: null,
    twitter: null,
    linkedin: null,
    firstname: null,
    lastname: null,
  }

  handleCheck = (ev) => {
    //console.log(ev.target.value)
    let arr = this.state.checked
    if (arr.indexOf(`${ev.target.value}`) > -1) {
      arr.splice(arr.indexOf(`${ev.target.value}`), 1)
    } else {
      arr.push(`${ev.target.value}`)
    }
    this.setState({ checked: arr })
    //console.log(this.state.checked)
  }

  buttonSubmit = () => {
    let email = this.state.username
    let password = this.state.password
    let locations = this.state.checked
    let description = this.state.description
    let facebook = this.state.facebook
    let twitter = this.state.twitter
    let linkedin = this.state.linkedin
    let firstname = this.state.firstname
    let lastname = this.state.lastname
    let companyCode=this.props.companyCode
    let company=null

    //KUNAL PUT CODE HERE
    //dont forget to check that email, password, firstname, and lastname are not null
    //check to make sure that the locations array size !=0
    //when successfully submits use this code history.push('/landing/employee/interns')

    axios.post('/CREATE-EMPLOYEE', {
      "username": email,
      "password": password,
      "firstName": firstname,
      "lastName": lastname,
      "company": company,
      "location": locations,
      "description": description,
      "facebook": facebook,
      "linkedin": linkedin,
      "twitter": twitter
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Created account password!");
        //Go to employee page
        this.redirect(1);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  userChange = (ev) => {
    this.setState({ username: ev.target.value })
    //console.log(this.state.username)
  }

  passChange = (ev) => {
    this.setState({ password: ev.target.value })
    //console.log(this.state.password)
  }

  descriptionChange = (ev) => {
    this.setState({ description: ev.target.value })
    //console.log(this.state.description)
  }

  faceChange = (ev) => {
    this.setState({ facebook: ev.target.value })
    //console.log(this.state.facebook)
  }

  linkedChange = (ev) => {
    this.setState({ linkedin: ev.target.value })
    //console.log(this.state.linkedin)
  }

  twitterChange = (ev) => {
    this.setState({ twitter: ev.target.value })
    //console.log(this.state.twitter)
  }

  fnameChange = (ev) => {
    this.setState({ firstname: ev.target.value })
    //console.log(this.state.firstname)
  }

  lnameChange = (ev) => {
    this.setState({ lastname: ev.target.value })
    //console.log(this.state.lastname)
  }

  componentWillMount() {
    if (this.props.item.length == 0) {
      let i = 0
      for (let a of this.props.companyLocationList()) {
        this.props.item.push(<Checkbox label={a} key={i} value={a} onCheck={this.handleCheck} />)
        i++
      }
    }
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
            <Row className="Title"> Moderator Registration </Row>
            <Row>
              <Username styles={this.styles} userChange={this.userChange.bind(this)} />
            </Row>
            <Row>
              <Password styles={this.styles} passChange={this.passChange.bind(this)} />
            </Row>
            <Row>
              <Firstname styles={this.styles} fnameChange={this.fnameChange.bind(this)} />
            </Row>
            <Row>
              <Lastname styles={this.styles} lnameChange={this.lnameChange.bind(this)} />
            </Row>
            <Row className="checkboxes">
              Company Locations:<br />
              {this.props.item}
            </Row>
            <Row>
              <ImageUpload />
            </Row>

            <Row>
              <Description styles={this.styles} descriptionChange={this.descriptionChange.bind(this)} />
            </Row>
            <Row>
              <LinkedInLink styles={this.styles} linkedChange={this.linkedChange.bind(this)} />
            </Row>
            <Row>
              <FacebookLink styles={this.styles} faceChange={this.faceChange.bind(this)} />
            </Row>
            <Row>
              <TwitterLink styles={this.styles} twitterChange={this.twitterChange.bind(this)} />
            </Row>
            <Row className="notThis">
              <RaisedButton
                label="Register Account"
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

export default NewEmployeeRegister;