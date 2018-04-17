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
      isNew: false,
      prevLength: 0,
    };
    this.interval = setInterval(this.componentDidMount, 5000);
    try {
      const serializedState = localStorage.getItem(`pair-notifications-${props.uid}`)
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState);
        // console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem(`pair-notifications-${this.props.uid}`, serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    // console.log('eyy')
    if (this.state.isNew) {
      // console.log('lmao')
      this.props.changeIcon();
    }
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  };

  componentDidMount = () => {
    let that = this;
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
            <Paper key={i} style={{ width: '90%', marginLeft: '5%', padding: '10px' }}>
              <p>{response.data[i]}</p>
            </Paper>
            // <MenuItem primaryText={<p>{response.data[i]}</p>} key={i} />
          )
        }
        tempCard.shift()
        that.setState({ notificationsCard: tempCard }, that.checkIfNew)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  checkIfNew = () => {
    if (this.state.prevLength !== this.state.notificationsCard.length) {
      // console.log('whatever')
      this.setState({ prevLength: this.state.notificationsCard.length, isNew: true }, this.saveState);
    } else {
      this.setState({ prevLength: this.state.notificationsCard.length, isNew: false }, this.saveState);
    }
  }

  returnDesktop() {
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
          <div style={{ marginTop: '10px', marginBottom: '10px', maxHeight:'80vh', overflowY:'auto' }}>
            {(this.state.notificationsCard.length > 0) ?
              this.state.notificationsCard
              : <MenuItem primaryText='No notifications' key='0' onClick={this.props.closeNotifications} />}
          </div>
          {/* </Menu> */}
        </Popover>
      </div>
    );
  }

  returnMobile() {
    return (
      <div>
        <Popover
          open={this.props.notificationVisible}
          onRequestClose={this.props.closeNotifications}
          canAutoPosition
          style={{ width: '70vw', overflowX: 'hidden' }}
        >
          {/* <Menu> */}
          <div style={{ marginTop: '10px', marginBottom: '10px', maxHeight:'80vh', overflowY:'auto' }}>
            {(this.state.notificationsCard.length > 0) ?
              this.state.notificationsCard
              : <MenuItem primaryText='No notifications' key='0' onClick={this.props.closeNotifications} />}
          </div>
          {/* </Menu> */}
        </Popover>
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default Notifications;
