import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import People from './People'
import DisplayProfile from './DisplayProfile'
//import './Members.css';

class Members extends Component {

  changeSelected=()=>{
    console.log('hi')
  }

  render() {
    let toSend={
      props:this.props,
      changeSelected:this.changeSelected,
    }
    return (
      <div>
        <People {...toSend}/>
        <DisplayProfile />
      </div>
    );
  }
}

export default Members;