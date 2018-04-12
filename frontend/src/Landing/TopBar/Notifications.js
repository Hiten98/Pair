import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'
//import './Notifications.css';

class Notifications extends Component {
  constructor(props) {
    super(props)
    this.state = {
      notificationsCard: [],
    }
  }

  componentDidMount = () => {
    let that = this
    // console.log(this.props)
    axios.post('/GET-NOTIFICATIONS', {
      "uid": this.props.uid
    }).then(function (response) {
      // console.log(response.data);
      // console.log(response.data);
      if (response.data.status != false) {
        // Make Cards for INTERNS
        let tempCard = []
        for (let i in response.data) {
          tempCard.unshift(
            <MenuItem primaryText={response.data[i]} key={i} />
          )
        }
        tempCard.shift()
        that.setState({ notificationsCard: tempCard })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <Popover
          open={this.props.notificationVisible}
          anchorEl={this.props.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.props.closeNotifications}
        >
          <Menu>
            {(this.state.notificationsCard.length>0)?
              this.state.notificationsCard
              :<MenuItem primaryText='No notifications' key='0' onClick={this.props.closeNotifications}/>}
          </Menu>
        </Popover>
      </div>
    );
  }
}

export default Notifications;
