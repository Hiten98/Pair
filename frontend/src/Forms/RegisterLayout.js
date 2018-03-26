import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import InternCreation from './Intern/InternCreation'
import UserPreferences from './Intern/UserPreferences/PreferencesLayout'
import './RegisterLayout.css';
import EmployeeRegistrationForm from './Employee/EmployeeRegistrationForm';
import ForgotForm from '../ForgotPassword/ForgotForm';
import EmployeeEditProfile from './Employee/EmployeeEditProfile';

class RegisterLayout extends Component {
  render() {
    return (
      <div>
        <Col xs={1} s={2}>
        </Col>
        <Col xs={10} s={8} className="mid-col">
          <Switch>
            <Route path="/register/intern/creation" render={() => <InternCreation updateUid={this.props.updateUid} />} />
            <Route path="/register/intern/preferences" render={() => <UserPreferences uid={this.props.uid} />} />
            <Route path='/register/employee/edit-profile' render={()=><EmployeeEditProfile {...this.props}/>}/>
            <Route path="/register/employee"
              render={() => <EmployeeRegistrationForm {...this.props} />} />
            <Route path='/register/forgot' render={()=><ForgotForm />}/>
            <Route path="/" render={() => <Redirect to='/home/login' />} />
          </Switch>
        </Col>
        <Col xs={1} s={2}>
        </Col>
      </div>
    );
  }
}

export default RegisterLayout;