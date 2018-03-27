import React, { Component } from 'react';
import { grey800, black } from 'material-ui/styles/colors';
import { Row } from 'react-bootstrap'
import { TextField } from 'material-ui';
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
  }

  userChange=(ev)=>{
    this.props.changeEmail(ev.target.value)
  }

  render() {
    return (
      <Row>
          <TextField
            className="username"
            floatingLabelText="Enter your email"
            floatingLabelStyle={this.styles.floatingLabelStyle}
            floatingLabelShrinkStyle={this.styles.floatingLabelShrinkStyle}
            underlineStyle={this.styles.underlineStyle}
            hintStyle={this.styles.hintStyle}
            onChange={this.userChange}
            style={{width:'240px'}}
          />
        </Row>
    );
  }
}

export default Email;