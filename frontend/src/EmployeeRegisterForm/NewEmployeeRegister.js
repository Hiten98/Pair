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