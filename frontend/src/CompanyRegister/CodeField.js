import React, { Component } from 'react';
import { grey800, black } from 'material-ui/styles/colors'
import PasswordField from 'material-ui-password-field'
import {Row} from 'react-bootstrap'
import RegisterButtons from './RegisterButtons'
//import './CodeField.css';

class CodeField extends Component {
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

  //<RegisterButtons companyName={"fdsfs"} />

  changeName=(ev)=>{
    this.props.changeName(ev.target.value)
  }

  changeEmail=(ev)=>{
    this.props.changeEmail(ev.target.value)
  }

  changePassword=(ev)=>{
    this.props.changePassword(ev.target.value)
  }

  render() {
    return (
      <Row className="row-sm">
          <PasswordField
            className="companyName"
            ref="companyName"
            floatingLabelText="Enter Company Name"
            visible
            disableButton
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={this.styles.visibilityIconStyle}
            hintStyle={this.styles.hintStyle}
            onChange={this.changeName}
          />
          <PasswordField
            className="companyEmail"
            floatingLabelText="Enter Company Contact Email"
            visible
            disableButton
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={this.styles.visibilityIconStyle}
            hintStyle={this.styles.hintStyle}
            onChange={this.changeEmail}
          />
          <PasswordField
            className="companyPassword"
            floatingLabelText="Enter Company Password"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={{ opacity: '0.8' }}
            hintStyle={this.styles.hintStyle}
            onChange={this.changePassword}
          />
        </Row>
    );
  }
}

export default CodeField;
