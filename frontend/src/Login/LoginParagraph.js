import React, { Component } from 'react';
import logo from '../images/original_logo.png'
import './LoginParagraph.css'

class loginParagraph extends Component {
  render() {
    return (
      <div className='login-whole-page'>
        <img src={logo} alt="logo" className="logo"/>
        <div className="info">
          Welcome to Pair, a tool to help interns find their temporary homes with other interns
          <br/><br/>
          Login on the right or if you are an employee of a company registered with Pair and need to register for the service click on the "Employee Registration" button
        </div>
      </div>
    );
  }
}

export default loginParagraph;