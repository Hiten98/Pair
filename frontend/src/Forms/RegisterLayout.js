import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import InternCreation from './Intern/InternCreation'
import UserPreferences from './Intern/UserPreferences/PreferencesLayout'
import './RegisterLayout.css';
import EmployeeRegistrationForm from './Employee/EmployeeRegistrationForm';

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
            <Route path="/register/employee"
              render={() => <EmployeeRegistrationForm updateUid={this.props.updateUid} company={this.props.company} locations={this.props.locations} />} />
          </Switch>
        </Col>
        <Col xs={1} s={2}>
        </Col>
      </div>
    );
  }
}

export default RegisterLayout;