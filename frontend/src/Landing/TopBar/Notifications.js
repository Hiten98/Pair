import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
//import './Notifications.css';

class Notifications extends Component {
  constructor(props){
    super(props)
  }

  render() {
    if (this.props.notificationVisible) {
      return (
        <div>
          {/* Arvindh code here */}
        </div>
      );
    } else {
      return null
    }
  }
}

export default Notifications;
