import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import {RaisedButton} from 'material-ui'
import { Row, Col } from 'react-bootstrap'
import history from '../history'
import ForgotPasswordModal from './ForgotPasswordModal'
import './NavButtons.css';

class NavButtons extends Component {
  goToEmployee = () => {
    history.push('/home/register')
  }

  render() {
    return (
      <Row className='topBar'>
        <Col xs={6}>
          <ForgotPasswordModal />
        </Col>
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
      </Row>
    );
  }
}

export default NavButtons;