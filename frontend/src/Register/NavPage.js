import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'
import { Row, Col } from 'react-bootstrap'
import history from '../history'
import '../Login/NavButtons.css';

class NavButtons extends Component {
  goToLogin = () => {
    history.push('/home/login')
  }

  goToCompanyRegister = () => {
    history.push('/home/company-register')
  }

  returnDesktop() {
    return (
      <Row className='topBar'>
        <Col xs={6}>
          <Row className='row-sm employee-registration-link login-page-link'>
            <RaisedButton
              label="Login Page"
              primary={true}
              onClick={this.goToLogin}
              style={{ width: '100%', marginTop: '5%' }}
            />
          </Row>
        </Col>
        <Col xs={6}>
          <Row className='row-sm company-registration-link'>
            <RaisedButton
              label="Company Registration"
              primary
              onClick={this.goToCompanyRegister}
              style={{ width: '100%', marginTop: '5%' }}
            />
          </Row>
        </Col>
      </Row>
    );
  }

  returnMobile() {
    return (
      <Row className='topBar'>
        <Row className='row-sm employee-registration-link login-page-link'>
          <RaisedButton
            label="Login Page"
            primary={true}
            onClick={this.goToLogin}
            // style={{ width: '100%', marginTop: '5%' }}
          />
        </Row>
        <Row className='row-sm company-registration-link'>
          <RaisedButton
            label="Company Registration"
            primary
            onClick={this.goToCompanyRegister}
            // style={{ width: '100%', marginTop: '5%' }}
          />
        </Row>
      </Row>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 1200) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default NavButtons;