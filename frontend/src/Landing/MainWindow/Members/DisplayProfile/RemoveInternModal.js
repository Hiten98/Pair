import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
import axios from 'axios'
//import './LandingScreen.css';

class LandingScreen extends Component {
  removeIntern = () => {
    let that = this
    axios.post("/REMOVE-USER", {
      "userID": this.props.currProfile
    }).then(function (response) {
      if (response.data.status) {
        that.props.closeAll()
        that.props.changeSelected(that.props.uid, 0)
      } else {
        alert('Error, please try again')
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    let actions = [
      <RaisedButton
        label='No, I am not sure'
        onClick={this.props.closeAll}
        style={{ marginBottom: '18px' }}
      />,
      <RaisedButton
        label="Yes, I'm sure"
        onClick={this.removeIntern}
        style={{ marginBottom: '18px' }}
      />
    ]
    //console.log(this.props)
    return (
      <Dialog
        title='Are you sure you want to remove this user from the company? This cannot be undone'
        modal
        open={this.props.removeOpen}
        actions={actions}
      >
      </Dialog>
    );
  }
}

export default LandingScreen;