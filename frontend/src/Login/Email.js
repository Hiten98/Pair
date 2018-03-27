import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
//import './LandingScreen.css';

class Email extends Component {
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

  userChange=(ev)=>{
    this.props.changeEmail(ev.target.value)
  }

  render() {
    return (
      <Row>
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
    );
  }
}

export default Email;