import React, { Component } from 'react';
import PasswordField from 'material-ui-password-field'
import { TextField } from 'material-ui'
import { Row } from 'react-bootstrap'
import { grey800, black, red900 } from 'material-ui/styles/colors';
//import './CodeField.css';

class CodeField extends Component {
  constructor(props) {
    super(props)
    this.state = {
      conditions: null,
    }
  }
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

  changeName = (ev) => {
    this.props.changeName(ev.target.value)
  }

  changeEmail = (ev) => {
    this.props.changeEmail(ev.target.value)
  }

  changePassword = (ev) => {
    if (ev.target.value.length < 8) {
      this.setState({ conditions: { errorText: "Your password is too short", errorStyle: { color: red900 } } });
    } else {
      this.setState({ conditions: null });
      this.props.changePassword(ev.target.value);
    }
  }

  changeLocations = (ev) => {
    this.props.changeLocations(ev.target.value)
  }

  render() {
    return (
      <Row className="row-sm">
        <Row>
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
        </Row>
        <Row>
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
        </Row>
        <Row>
          <PasswordField
            className="companyPassword"
            floatingLabelText="Enter Company Password"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={{ opacity: '0.8' }}
            hintStyle={this.styles.hintStyle}
            onChange={this.changePassword}
            {...this.state.conditions}
          />
        </Row>
        <Row>
          <TextField
            className="companyLocations"
            floatingLabelText="Enter Company Locations separated by semicolon"
            multiLine
            style={{ width: 375, textAlign: 'left' }}
            visible
            disableButton
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            visibilityIconStyle={this.styles.visibilityIconStyle}
            hintStyle={this.styles.hintStyle}
            onChange={this.changeLocations}
          />
        </Row>
      </Row>
    );
  }
}

export default CodeField;
