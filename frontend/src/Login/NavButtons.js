import React, { Component } from 'react';
import {RaisedButton} from 'material-ui'
import { Row, Col } from 'react-bootstrap'
import history from '../history'
import './NavButtons.css';

class NavButtons extends Component {
  goToEmployee = () => {
    history.push('/home/register')
  }

  goToCompanyRegister = () => {
    history.push('/home/company-register')
  }

  render() {
    return (
      <Row className='topBar'>
        <Col xs={6}>
          <Row className='row-sm employee-registration-link'>
            <RaisedButton
              label="Employee Registration"
              primary
              onClick={this.goToEmployee}
              style={{width:'100%',marginTop: '5%'}}
            />
          </Row>
        </Col>
        <Col xs={6}>
          <Row className='row-sm company-registration-link'>
            <RaisedButton
              label="Company Registration"
              primary
              onClick={this.goToCompanyRegister}
              style={{width:'100%',marginTop: '5%'}}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default NavButtons;
