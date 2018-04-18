import React, { Component } from 'react';
import { RaisedButton, Dialog, Snackbar } from 'material-ui';
import axios from 'axios'
//import './LeaveChatButton.css';

class LeaveChatButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currChat: '',
      sopen: false,
      pChat: '',
    }
    // console.log(props)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.state.currChat != nextProps.state.currChatName) {
      this.setState({ pChat: this.state.currChat, currChat: nextProps.state.currChatName })
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

  handleRequestClose = () => {
    this.setState({ sopen: false })
  }

  returnDesktop() {
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
          style={{ position: 'absolute', right: '1vw', top: '75px' }}
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

  returnMobile() {
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
          // style={{Index:'1100' }}
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

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (this.state.currChat.charAt(0) != 1 && this.state.currChat.charAt(0) != 2) {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
        return this.returnMobile();
      } else {
        return this.returnDesktop();
      }
    } else {
      return null;
    }
  }
}

export default LeaveChatButton;