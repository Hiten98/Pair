import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import Email from './Email'
import Password from './Password'
import LoginButtons from './LoginButtons'
import NavButtons from './NavButtons'
import './LoginForm.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: null,
      password: null,
    }
  }

  changeEmail = (email) => {
    this.setState({ email: email })
  }

  changePassword = (pass) => {
    this.setState({ password: pass })
  }

  render() {
    return (
      <div className='form'>
        <NavButtons />
        <Row className="login-title">
          Login
        </Row>

        <Email changeEmail={this.changeEmail} />

        <Password changePassword={this.changePassword} />

        <LoginButtons email={this.state.email} password={this.state.password} updateUid={this.props.updateUid} />

      </div>
    );
  }
}

export default LandingScreen;