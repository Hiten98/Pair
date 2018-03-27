import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'
import { Row } from 'react-bootstrap'
import history from '../history'
import '../Login/NavButtons.css';

class NavButtons extends Component {
  goToLogin = () => {
    history.push('/home/login')
  }

  render() {
    return (
      <Row className='topBar'>
        <Row className='employee-registration-link login-page-link'>
          <RaisedButton
            label="Login Page"
            primary={true}
            onClick={this.goToLogin}
            style={{marginTop: '2%'}}
          />
        </Row>
      </Row>
    );
  }
}

export default NavButtons;