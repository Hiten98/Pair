import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import { RaisedButton, Dialog, TextField, Snackbar } from 'material-ui';
import axios from 'axios'
//import './CreateGroupChat.css';

class CreateGroupChat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      chatName: '',
      sopen: false,
    }
    // console.log(props)
  }

  ifDisabled=[{disabled:true},null]

  openModal=()=>{
    this.setState({open:true})
  }

  changeChatName=(ev)=>{
    this.setState({chatName:ev.target.value})
  }

  closeModal=()=>{
    this.setState({open:false})
  }

  handleRequestClose=()=>{
    this.setState({sopen:false})
  }

  handleSubmit=()=>{
    let that=this
    if(this.state.chatName.length==0){
      alert('Please enter the chat name')
    } else {
      axios.post('/CREATE-GROUP-CHAT', {
        userID:this.props.uid,
        chatroomName:this.state.chatName,
      }).then((response) => {
        console.log(response.data)
        if(response.data.status){
          that.setState({sopen:true})
          that.closeModal()
          that.props.changeNeedToUpdate()
        } else {
          alert('Please choose a different chat name')
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  render() {
    let actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.closeModal}
      />,
      <RaisedButton
        label="Create Group Chat"
        onClick={this.handleSubmit}
        {...this.ifDisabled[this.state.chatName.length]}
      />,
    ]

    return (
      <div className='create-gc-div'>
        <RaisedButton
          secondary
          label='Create Group Chat'
          onClick={this.openModal}
          className='create-gc-button'
        />
        <Dialog
          modal
          actions={actions}
          title={`Create a Group Chat`}
          open={this.state.open}
        >
          <h4>You can add people in their profile</h4>
          <TextField
            onChange={this.changeChatName}
            floatingLabelText={`Enter name for the group chat`}
            fullWidth
          />
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message={`Created ${this.state.chatName}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default CreateGroupChat;
