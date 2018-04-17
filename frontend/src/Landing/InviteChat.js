import React, { Component } from 'react';
import { Dialog, RaisedButton } from 'material-ui';
//import './InviteChat.css';

class InviteChat extends Component {
  actions = [
    <RaisedButton
      label="No"
      onClick={this.props.closeModal}
    />,
    <RaisedButton
      label="Yes"
      onClick={this.props.acceptedChat}
    />,
  ]

  render() {
    return (
      <div>
        <Dialog
          modal
          title={`Would you like to accept the invitation to join ${this.props.chatToAccept.substring(1)}?`}
          actions={this.actions}
          open={this.props.open}
        >
        </Dialog>
      </div>
    );
  }
}

export default InviteChat;
