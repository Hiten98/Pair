import React, { Component } from 'react';
import {Paper} from 'material-ui'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import './People.css';

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mods: [],
      interns:[],
    }
  }

  componentDidMount = () => {
    let that = this
    if(this.props.state.currChatName.substring(0,1)==1){
      axios.post('/GET-MODS-IN-CHATROOM', {
        "chatroomName": this.props.state.currChatName,
      }).then(function (response) {
        let tempMod=[]
        for (let i in response.data) {
          let splitted=response.data[i].split(':')
          let bio=''
          for(let e=2;e<splitted.length();e++){
            bio+=splitted[e]
          }
          tempMod.push(
            <Paper zDepth={2} key={i}>
              
            </Paper>
          )
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
    axios.post('/GET-USERS-IN-CHATROOM', {
      "chatroomName": this.props.state.currChatName,
    }).then(function (response) {
      for (let i in response.data) {

      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    return (
      <Col xs={3} className='list-column'>
        {this.state.mods}
        {this.state.interns}
      </Col>
    );
  }
}

export default People;