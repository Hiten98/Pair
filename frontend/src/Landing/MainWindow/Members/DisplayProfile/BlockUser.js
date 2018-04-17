import React, { Component } from 'react';
import { RaisedButton } from 'material-ui';
import axios from 'axios';
//import './BlockUser.css';

class BlockUser extends Component {
  unBlock=()=>{
    let that=this
    axios.post('/UNBLOCK-USER', {
      blocker:this.props.uid,
      blocking:this.props.currProfile,
    }).then((response) => {
      console.log(response.data);
      that.props.updateProfile();
    }).catch((error) => {
      console.log(error);
    });
  }

  block=()=>{
    let that=this
    axios.post('/BLOCK-USER', {
      blocker:this.props.uid,
      blocking:this.props.currProfile,
    }).then((response) => {
      console.log(response.data);
      that.props.updateProfile();
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    if (this.props.blockedUsers.includes(this.props.currProfile)) {
      return (
        <RaisedButton
          secondary
          style={{ float: 'left' }}
          label='unblock messages'
          className='link'
          onClick={this.unBlock}
        />
      );
    } else {
      return (
        <RaisedButton
          secondary
          style={{ float: 'left' }}
          label='block messages'
          className='link'
          onClick={this.block}
        />
      )
    }
  }
}

export default BlockUser;
