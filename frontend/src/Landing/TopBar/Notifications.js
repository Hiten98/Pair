import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios'
import { Paper } from 'material-ui';
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
      "userID": this.props.uid
    }).then(function (response) {
      // console.log(response.data);
      // console.log(response.data);
      if (response.data.status != false) {
        // Make Cards for INTERNS
        let tempCard = []
        for (let i in response.data) {
          tempCard.unshift(
            <Paper key={i} style={{ width: '90%', marginLeft: '5%' }} zDepth={0}>
              <p>{response.data[i]}</p>
            </Paper>
            // <MenuItem primaryText={<p>{response.data[i]}</p>} key={i} />
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
          style={{ width: '30vw', overflowX: 'hidden' }}
        >
          {/* <Menu> */}
          <div style={{ marginTop: '10px', marginBottom: '10px' }}>
            {(this.state.notificationsCard.length > 0) ?
              this.state.notificationsCard
              : <MenuItem primaryText='No notifications' key='0' onClick={this.props.closeNotifications} />}
          </div>
          {/* </Menu> */}
        </Popover>
      </div>
    );
  }
}

export default Notifications;
