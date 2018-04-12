import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton, Dialog, Snackbar } from 'material-ui';
import axios from 'axios'
//import './RemoveInternGroup.css';

class RemoveInternGroup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      currChat: '',
      sopen:false,
      pChat:'',
      uid:'',
      name:'',
      pname:'',
    }
    // console.log(props.props)
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log(nextProps)
    if (this.state.currChat != nextProps.props.state.currChatName) {
      this.setState({ pChat:this.state.currChat, currChat: nextProps.props.state.currChatName })
    }
    if(this.state.uid!=nextProps.currProfile||this.state.uid!=`${nextProps.firstname} ${nextProps.lastname}`){
      // console.log(`${nextProps.firstname} ${nextProps.lastname}`)
      this.setState({uid:nextProps.currProfile,pname:this.state.name, name:`${nextProps.firstname} ${nextProps.lastname}`})
    }
  }

  openModal = () => {
    this.setState({ open: true })
  }

  handleLeave = () => {
    let that = this
    axios.post('/REMOVE-FROM-CHAT', {
      userID: this.state.uid,
      chatroomName: this.state.currChat,
    }).then((response) => {
      console.log(response.data)
      if (response.data.status) {
        that.setState({ sopen: true })
        that.props.closeAll()
        that.props.props.changeNeedToUpdate()
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
        onClick={this.props.closeAll}
        style={{marginBottom:'18px'}}
      />,
      <RaisedButton
        label="Yes, I'm sure"
        onClick={this.handleLeave}
        style={{marginBottom:'18px'}}
      />
    ]
    return (
      <div>
        <Dialog
          title={`Are you sure you want to kick ${this.state.name} from ${this.state.currChat.substring(1)}?`}
          modal
          open={this.props.leaveOpen}
          actions={actions}
        >
        </Dialog>
        <Snackbar
          open={this.state.sopen}
          message={`Removed user from ${this.state.pChat.substring(1)}`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default RemoveInternGroup;