import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { black, grey800 } from 'material-ui/styles/colors'
//import './Email.css';


class Email extends Component {

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
        floatingLabelText="Email"
        visible
        fullWidth
        value={this.props.dv}
        disableButton={true}
        floatingLabelStyle={this.styles.floatingLabelStyle}
        floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
        underlineStyle={this.styles.underlineStyle}
        visibilityIconStyle={this.styles.visibilityIconStyle}
        onChange={this.props.change}
      />
    );
  }
}

export default Email;