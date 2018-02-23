import React, { Component } from 'react';
import { withRouter } from 'react-router'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import { TextField, RaisedButton } from 'material-ui'
import LoginFormField from './loginFormField.js'
import LoginParagraph from './loginParagraph.js'
import { pinkA200, black } from 'material-ui/styles/colors'
import './form.css';
import history from '../history'
import axios from 'axios'

axios.defaults.baseURL='http://localhost:9090'

class form extends Component {
  state = {
    username: null,
    password: null,
  }

  getUser = (username) => {
    this.setState({ username })

  }

  getPass = (password) => {
    this.setState({ password })
  }

  handleLogin = () => {
    const username = this.state.username
    const password = this.state.password
    //kunal code submit here
    axios.post('/LOGIN', {
      "username": username,
      "password": password
    }).then((response) => {
      console.log(response.data.userID);
      if (response.data.userID != null && username != null && password != null) {
        this.props.updateUid(response.data.querySelectorID);
        if (response.data.UserId.charAt(0) == 2) {
          //GO TO EMPLOYEE Landing Page
          this.redirect(1);
        } else {
          //GO TO INTERN Landing Page
          this.redirect(0)
        }
      } else {
        //Login failed
        this.setState({
          error: true
        })
      }
    }).catch((error) => {
      console.log(error);
    });

    //if doing a fetch use this at the end .then(this.redirect(classification))
    //where classification is whether it is an employee or intern, change the variable however you want
  }

  redirect = (uid) => {
    this.setState({ username: null })
    this.setState({ password: null })
    if (uid == 1)
      return <Redirect to='/employee-landing' />
    else
      return <Redirect to='/intern-landing' />
  }

  goToEmployee = () => {
    history.push('/register')
  }

  render() {
    return (
      <Col xs={12} sm={4} md={4} className="loginForm">
        <div className="co">
          <Row className="title row-sm">
            Login
        </Row>

          <LoginFormField getUser={this.getUser} getPass={this.getPass} />

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Login"
              primary
              onClick={this.handleLogin}
            />
          </Row>

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Company Page"
              primary
              onClick={this.goToEmployee}
            />
          </Row>

          <Row className="row-sm item">
            <LoginParagraph />
          </Row>
        </div>
      </Col>
    );
  }
}

export default form;