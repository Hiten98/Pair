import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import logo from '../images/original_logo.png'
import '../paragraph.css'

class loginParagraph extends Component {
  render() {
    return (
      <div>
        <img src={logo} alt="logo" className="logo"/>
        <div className="info">
          Welcome to Pair, a tool to help interns find their temporary homes with other interns
          <br/><br/><br/>
          Login on the right or if you are a company click on the "Company Page" button
        </div>
      </div>
    );
  }
}

export default loginParagraph;