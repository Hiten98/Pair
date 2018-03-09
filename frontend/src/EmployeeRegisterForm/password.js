import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import PasswordField from 'material-ui-password-field'
//import './LandingScreen.css';

class Password extends Component {
  render() {
    return (
      <PasswordField
        className="password"
        hintText="At least 8 characters"
        floatingLabelText="Password"
        defaultValue={this.props.dv}
        floatingLabelStyle={this.props.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.props.styles.floatingLabelShrinkStyle}
        underlineStyle={this.props.styles.underlineStyle}
        visibilityIconStyle={{ opacity: '0.8' }}
        fullWidth
        hintStyle={this.props.styles.hintStyle}
        onChange={this.props.passChange}
      />
    );
  }
}

export default Password;