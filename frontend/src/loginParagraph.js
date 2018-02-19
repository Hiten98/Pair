import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import logo from "./images/original_logo.png"
import './paragraph.css'

class loginParagraph extends Component {
  render() {
    return (
      <div className="info">
        <img src={logo} alt="Pair logo" className="logo"/>
      </div>
    );
  }
}


export default loginParagraph;