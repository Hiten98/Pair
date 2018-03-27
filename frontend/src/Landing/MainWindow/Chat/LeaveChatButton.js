import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton, Dialog, Snackbar } from 'material-ui';
import axios from 'axios'
//import './LeaveChatButton.css';

class LeaveChatButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currChat: '',
      sopen:false,
      pChat:'',
    }
    // console.log(props)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.currChat != nextProps.state.currChatName) {
      this.setState({ pChat:this.state.currChat, currChat: nextProps.state.currChatName })
    }
  }

  openModal = () => {
    this.setState({ open: true })
  }

  closeModal = () => {
    this.setState({ open: false })
  }

  handleLeave = () => {
    let that = this
    axios.post('/REMOVE-FROM-CHAT', {
      userID: this.props.uid,
      chatroomName: this.state.currChat,
    }).then((response) => {
      console.log(response.data)
      if (response.data.status) {
        that.setState({ sopen: true })
        that.closeModal()
        that.props.changeNeedToUpdate()
      } else {
        alert('Something went wrong, please try again')
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  handleRequestClose=()=>{
    this.setState({sopen:false})
  }

  render() {
    let actions = [
      <RaisedButton
        label='No, I am not sure'
        onClick={this.closeModal}
      />,
      <RaisedButton
        label="Yes, I'm sure"
        onClick={this.handleLeave}
      />
    ]
    return (
      <div>
        <RaisedButton
          label='Leave Chat'
          style={{ position: 'absolute', right: '1vw', top: '7vh' }}
          secondary
          onClick={this.openModal}
        />
        <Dialog
          title={`Are you sure you want to leave ${this.state.currChat.substring(1)}?`}
          modal
          open={this.state.open}
          actions={actions}
        >
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message={`Left ${this.state.pChat.substring(1)}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default LeaveChatButton;