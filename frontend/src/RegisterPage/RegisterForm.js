import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import { TextField, RaisedButton } from 'material-ui'
import RegisterFormField from './RegisterFormField.js'
import RegisterParagraph from './RegisterParagraph.js'
import '../LoginPage/form.css';
import history from '../history'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:9090'

class RegisterForm extends Component {
  loc=[]
  state = {
    companyCode: null,
  }

  getCompanyCode = (companyCode) => {
    this.setState({ companyCode })
    this.props.updateCompanyCode(companyCode)
  }

  handleLogin = () => {
    const companyCode = this.state.companyCode
    axios.post('/GET-LOCATIONS-BY-COMPANY', {
      "companyCode": companyCode
    }).then(function (response) {
      console.log(response.data.locations);
      for (var location in response.data.locations) {
        //Make a locations item

      }
    }).catch(function (error) {
      console.log(error);
    });
    //kunal code submit here
    this.redirect(null)
    //if doing a fetch use this at the end .then(this.redirect(classification))
    //where classification is whether it is an employee or intern, change the variable however you want
  }

  redirect = (stuff) => {
    //parse it here
    const uid = null
    const loc = []
    this.setState({ companyCode: null })
    this.props.updateCompanyLocations(loc)
    history.push('/register/employee')
  }

  goToLogin = () => {
    history.push('/login')
  }

  render() {
    return (
      <Col xs={12} sm={4} md={4} className="loginForm">
        <div className="co">
          <Row className="rtitle row-sm">
            Register
          </Row>

          <RegisterFormField getCompanyCode={this.getCompanyCode} />

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Register"
              primary={true}
              onClick={this.handleLogin}
            />
          </Row>

          <Row className='row-sm lbutton'>
            <RaisedButton
              label="Login Page"
              primary={true}
              onClick={this.goToLogin}
            />
          </Row>

          <Row className="row-sm item">
            <RegisterParagraph />
          </Row>
        </div>
      </Col>
    );
  }
}

export default RegisterForm;