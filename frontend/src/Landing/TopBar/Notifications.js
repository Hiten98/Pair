import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
//import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount=()=>{
    console.log("Start!");
    console.log(this.props);
    console.log(this.props.uid);
  }

  render() {
    return (
      <div>
      <Popover
        open={this.props.notificationVisible}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
        targetOrigin={{horizontal: 'left', vertical: 'top'}}
        onRequestClose={this.props.closeNotifications}
      >
        <Menu>
          <MenuItem primaryText="Notification 1" />
          <MenuItem primaryText="Notification 2" />
          <MenuItem primaryText="Notification 3" />
          <MenuItem primaryText="Notification 4" />
        </Menu>
      </Popover>
      </div>
    );
  }
}

export default Notifications;
