import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import './Sidebar.css';

class Sidebar extends Component {
  render() {
    return (
      <div>
        <Col xsHidden sm={2} lg={2} className='side-bar'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </Col>
      </div>
    );
  }
}

export default Sidebar;