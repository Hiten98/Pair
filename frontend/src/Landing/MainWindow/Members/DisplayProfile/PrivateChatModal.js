import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Dialog, RaisedButton, Snackbar, TextField } from 'material-ui';
import axios from 'axios'
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props){
    super(props)
    this.state={
      open:false,
      chat:'',
    }
  }

  handleRequestClose=()=>{
    this.setState({open:false})
  }

  changeChatName=(ev)=>{
    this.setState({chat:ev.target.value})
  }

  handleSubmit=()=>{
    let that=this
    if(this.state.chat.length==0){
      alert('Please enter a chat name')
    } else {
      // console.log(this.props)
      axios.post('/CREATE-PRIVATE-CHAT', {
        userID1:this.props.uid,
        userID2:this.props.currProfile,
        chatroomName:this.state.chat,
      }).then((response) => {
        // console.log(response.data)
        if(response.data.status){
          that.setState({open:true})
          that.props.closeAll()
          that.props.props.changeNeedToUpdate()
        } else {
          alert('Please choose a different chat name')
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  ifDisabled=[{disabled:true},null]

  render() {
    let actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.props.closeAll}
        style={{marginBottom:'18px'}}
      />,
      <RaisedButton
        label="Create Private Chat"
        onClick={this.handleSubmit}
        {...this.ifDisabled[this.state.chat.length]}
        style={{marginBottom:'18px'}}
      />,
    ]
    return (
      <div>
        <Dialog
          modal
          actions={actions}
          title={`Create a private chat with ${this.props.firstname} ${this.props.lastname}`}
          open={this.props.privateOpen}
        >
          <TextField
            onChange={this.changeChatName}
            floatingLabelText={`Enter name for chat`}
            fullWidth
          />
          <h5>It will be the name of their chat too</h5>
        </Dialog>
        <Snackbar
          open={this.state.open}
          message={`Created ${this.state.chat} with ${this.props.firstname} ${this.props.lastname} `}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default LandingScreen;