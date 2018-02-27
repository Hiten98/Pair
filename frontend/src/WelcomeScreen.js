import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './WelcomeScreen.css';
import Login from './Login/LoginForm'
import LoginParagraph from './Login/LoginParagraph'

class LandingScreen extends Component {
  render() {
    return (
      <div className='wholePage'>
        <Row>
          {/* Descriptive paragraph */}
          <Col xsHidden={true} sm={8}>
            <Switch>
              <Route path='/home/login' render={() => <LoginParagraph />} />
              <Route path='/home/register' />
            </Switch>
          </Col>
          {/* the actual forms */}
          <Col xs={12} sm={4} className="forms">
            <Row>
              <Switch>
                <Route path='/home/login' render={() => <Login updateUid={this.props.updateUid} />} />
                <Route path='/home/register' updateUid={this.props.updateUid} />
              </Switch>
            </Row>
            {/* descriptive paragraph again */}
            <Row className='item'>
              <Switch>
                <Route path='/home/login' render={() => <LoginParagraph />} />
                <Route path='/home/register' />
              </Switch>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandingScreen;