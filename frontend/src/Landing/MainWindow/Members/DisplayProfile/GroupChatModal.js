import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Dialog, RaisedButton, DropDownMenu, MenuItem, Snackbar } from 'material-ui';
import axios from 'axios'
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      chats: [],
      currValue:'0',
      pValue:'',
      open:false,
    }
    // console.log(props)
  }

  handleSubmit=()=>{
    let that=this
    if(this.state.currValue!=0){
      // console.log(this.state)
      axios.post('/ADD-TO-GROUP-CHAT', {
        userID:this.props.currProfile,
        chatroomName:this.state.currValue,
      }).then((response) => {
        // console.log(response.data)
        if(response.data.status){
          that.setState({open:true})
          that.props.closeAll()
          that.props.props.changeNeedToUpdate()
        } else {
          alert('Something went wrong, please try again')
        }
      }).catch((error) => {
        console.log(error);
      });
    } else{
      alert('Please choose a group chat')
    }
  }

  componentWillReceiveProps = (nextProps) => {
    let that = this
    this.setState({currValue:'0'})
    if (this.props.groupOpen != nextProps.groupOpen) {
      axios.post('/GET-CHATROOM', {
        userID: this.props.uid
      }).then((response) => {
        // console.log(response.data)
        let tempList = []
        tempList.push(<MenuItem value='0' key={0} primaryText='Choose a chat' />)
        for (let i in response.data) {
          if (response.data[i].substring(0, 1) != 3||response.data[i]==this.props.props.state.currChatName) {
            continue
          }
          tempList.push(
            <MenuItem value={response.data[i]} key={parseInt(i) + 1} primaryText={response.data[i].substring(1)} />
          )
        }
        that.setState({ chats: tempList })
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  changeChat=(event,key,value)=>{
    this.setState({pValue:this.state.currValue,currValue:value})
  }

  handleRequestClose=()=>{
    this.setState({open:false})
  }

  ifDisabled=[null,{disabled:true}]

  render() {
    let actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.props.closeAll}
      />,
      <RaisedButton
        label="Submit"
        onClick={this.handleSubmit}
        {...this.ifDisabled[this.state.chats.length]}
      />,
    ]

    return (
      <div>
        <Dialog
          modal
          actions={actions}
          title={`Add ${this.props.firstname} ${this.props.lastname} to a group chat`}
          open={this.props.groupOpen}
        >
          {(this.state.chats.length==1) ?
            <h4>Not currently in any group chats or the person is already in all of your group chats, please create or join one</h4> :
            <DropDownMenu
              value={this.state.currValue}
              onChange={this.changeChat}
            >
              {this.state.chats}
            </DropDownMenu>}
        </Dialog>
        <Snackbar
          open={this.state.open}
          message={`Added ${this.props.firstname} ${this.props.lastname} to Group Chat`}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

export default LandingScreen;