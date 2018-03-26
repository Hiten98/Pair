import React, { Component } from 'react';
import logo from '../images/original_logo.png'
import './RegisterParagraph.css'

class RegisterParagraph extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="logo" className="register-logo"/>
        <div className="info">
          Welcome to Pair, a tool to help interns find their temporary homes with other interns
          <br/><br/><br/>
          Interns can find roommates by being in chats and looking for other interns that have similar preferences, when found they can then look for housing that fits their group's needs and wants
          <br/><br/><br/>
          Enter your company information to register your company with our platform
          <br/><br/><br/>
          You will receive a confirmation email once we validate your information
        </div>
      </div>
    );
  }
}

export default RegisterParagraph;
