import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import { grey800, black } from 'material-ui/styles/colors';
//import './Register.css';


class loginFormField extends Component {
  styles = {
    underlineStyle: {
      borderColor: grey800,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelShrinkStyle: {
      color: black,
    },
    hintStyle: {
      color: grey800,
      fontSize: '10vw',
      textAlign: 'left',
    },
    visibilityIconStyle: {
      opacity: '0',
    }
  }

  userChange = (ev) => {
    this.props.getUser(ev.target.value)
  }

  passChange = (ev) => {
    this.props.getPass(ev.target.value)
  }


  render() {
    return (
      <div>
        <Row className="row-sm">
          <PasswordField
            className="username"
            floatingLabelText="Enter your email"
            visible
            disableButton={true}
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            hintStyle={this.styles.hintStyle}
            visibilityIconStyle={this.styles.visibilityIconStyle}
            onChange={this.userChange}
          />
        </Row>
        <Row className="row-sm">
          <PasswordField
            className="password"
            hintText="At least 8 characters"
            floatingLabelText="Enter your password"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={{ opacity: '0.8' }}
            hintStyle={this.styles.hintStyle}
            onChange={this.passChange}
          />
        </Row>
      </div>
    );
  }
}

export default loginFormField;