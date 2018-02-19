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

  codeChange=(ev)=>{
    this.props.getCompanyCode(ev.target.value)
  }

  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default loginFormField;