import React, { Component } from 'react';
import { grey800, black } from 'material-ui/styles/colors'
import PasswordField from 'material-ui-password-field'
import {Row} from 'react-bootstrap'
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

  codeChange=(ev)=>{
    this.props.codeChange(ev.target.value)
  }

  render() {
    return (
      <Row className="row-sm">
          <PasswordField
            className="companyCode"
            //hintText="At least 8 characters"
            floatingLabelText="Enter your company code"
            disableButton
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={this.styles.visibilityIconStyle}
            hintStyle={this.styles.hintStyle}
            onChange={this.codeChange}
          />
        </Row>
    );
  }
}

export default CodeField;