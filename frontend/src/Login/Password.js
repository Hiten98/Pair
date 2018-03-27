import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { Row } from 'react-bootstrap'
import { grey800, black } from 'material-ui/styles/colors';
//import './LandingScreen.css';

class Password extends Component {
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

  passChange=(ev)=>{
    this.props.changePassword(ev.target.value)
  }

  render() {
    return (
      <Row>
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
    );
  }
}

export default Password;