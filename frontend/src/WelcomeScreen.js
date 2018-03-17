import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Login from './Login/LoginForm'
import LoginParagraph from './Login/LoginParagraph'
import RegisterForm from './Register/RegisterForm'
import './WelcomeScreen.css';
import RegisterParagraph from './Register/RegisterParagraph';


class LandingScreen extends Component {
  render() {
    return (
      <div className='wholePage'>
        <Row>
          {/* Descriptive paragraph */}
          <Col xsHidden={true} sm={8}>
            <Switch>
              <Route path='/home/login' render={() => <LoginParagraph />} />
              <Route path='/home/register' render={() => <RegisterParagraph />} />
              <Route path="/" render={() => <Redirect to='/home/login' />} />
            </Switch>
          </Col>
          {/* the actual forms */}
          <Col xs={12} sm={4} className="forms">
            <Row>
              <Switch>
                <Route path='/home/login' render={() => <Login updateUid={this.props.updateUid} />} />
                <Route path='/home/register' render={() => <RegisterForm updateUid={this.props.updateUid} uid={this.props.uid} updateCompany={this.props.updateCompany} updateLocations={this.props.updateLocations} />} />
              </Switch>
            </Row>
            {/* descriptive paragraph again */}
            <Row className='item'>
              <Switch>
                <Route path='/home/login' render={() => <LoginParagraph />} />
                <Route path='/home/register' render={() => <RegisterParagraph />} />
              </Switch>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default LandingScreen;