import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import CodeField from './CodeField'
import NavButtons from './NavButtons'
import RegisterButtons from './RegisterButtons'
import './RegisterForm.css';

class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyName: null,
      companyEmail: null,
      companyPassword: null,
      companyLocations: null,
    }
  }

  changeName = (name) => {
    this.setState({ companyName: name })
  }

  changeEmail = (email) => {
    this.setState({ companyEmail: email })
  }

  changePassword = (password) => {
    this.setState({ companyPassword: password })
  }

  changeLocations = (location) => {
    this.setState({ companyLocations: location })
  }

  render() {
    let toSend = {
      changeName: this.changeName,
      changeEmail: this.changeEmail,
      changePassword: this.changePassword,
      changeLocations: this.changeLocations,
    }
    return (
      <div className="form">
        <NavButtons />
        <Row className="company-register-title">
          Register Company
        </Row>

        <CodeField {...toSend} />

        <RegisterButtons {...this.state} {...this.props} />
      </div>
    );
  }
}

export default RegisterForm;
