import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { grey800, black } from 'material-ui/styles/colors';
//import './FirstName.css';

class FirstName extends Component {
  styles = {
    underlineStyle: {
      borderColor: black,
    },
    floatingLabelStyle: {
      color: grey800,
    },
    floatingLabelShrinkStyle: {
      color: black,
    },
    hintStyle: {
      color: grey800,
      fontWeight: "bold",
      textAlign: 'left',
    },
    visibilityIconStyle: {
      opacity: '0',
    },
  }

  render() {
    return (
      <PasswordField
        className="username"
        floatingLabelText="Facebook Link (Optional)"
        visible
        fullWidth
        value={this.props.dv}
        disableButton={true}
        floatingLabelStyle={this.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
        underlineStyle={this.styles.underlineStyle}
        hintStyle={this.styles.hintStyle}
        visibilityIconStyle={this.styles.visibilityIconStyle}
        onChange={this.props.facebookChange}
      />
    );
  }
}

export default FirstName;