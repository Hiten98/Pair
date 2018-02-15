import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import PasswordField from 'material-ui-password-field'
import { grey800, black } from 'material-ui/styles/colors';
//import './Register.css';

const styles = {
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

const userChange=(ev)=>{
//fill this in
}

const passChange=(ev)=>{
//fill this in
}


const loginFormField = () => {
  return (
    <div>
      <Row className="row-sm">
        <PasswordField
          className="username"
          floatingLabelText="Enter your username"
          visible
          disableButton={true}
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
          underlineStyle={styles.underlineStyle}
          hintStyle={styles.hintStyle}
          visibilityIconStyle={styles.visibilityIconStyle}
          onChange={userChange()}
        />
      </Row>
      <Row className="row-sm">
        <PasswordField
          className="password"
          hintText="At least 8 characters"
          floatingLabelText="Enter your password"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelShrinkStyle={styles.floatingLabelShrinkStyle}
          underlineStyle={styles.underlineStyle}
          visibilityIconStyle={{ opacity: '0.8' }}
          hintStyle={styles.hintStyle}
          onChange={passChange()}
        />
      </Row>
    </div>
  );
}

export default loginFormField;