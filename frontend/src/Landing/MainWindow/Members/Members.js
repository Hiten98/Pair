import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import People from './People'
import DisplayProfile from './DisplayProfile'
//import './Members.css';

class Members extends Component {
  render() {
    return (
      <div>
        <People {...this.props}/>
        <DisplayProfile />
      </div>
    );
  }
}

export default Members;