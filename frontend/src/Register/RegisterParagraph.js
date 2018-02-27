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
          If you are a company that wants to sign up for this service contact us at ********@****.*** and we will get back to you with information as soon as possible
          <br/><br/><br/>
          Register with the register code found in your email on the right or if you are looking to login click on the "Login Page" button
        </div>
      </div>
    );
  }
}

export default RegisterParagraph;