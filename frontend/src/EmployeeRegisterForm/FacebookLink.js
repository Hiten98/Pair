import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import PasswordField from 'material-ui-password-field'
//import './LandingScreen.css';

class Username extends Component {
  render() {
    return (
      <PasswordField
        className="username"
        floatingLabelText="Facebook Link (Optional)"
        visible
        fullWidth
        disableButton={true}
        defaultValue={this.props.dv}
        floatingLabelStyle={this.props.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.props.styles.floatingLabelShrinkStyle}
        underlineStyle={this.props.styles.underlineStyle}
        hintStyle={this.props.styles.hintStyle}
        visibilityIconStyle={this.props.styles.visibilityIconStyle}
        onChange={this.props.faceChange}
      />
    );
  }
}

export default Username;