import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Subheader, Avatar, Paper } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import axios from 'axios'
import './Sidebar.css';

axios.defaults.baseURL = 'http://localhost:9090'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      selected: [],
    }
  }

  handleClick = (i) => {
    let se = this.state.selected
    se[i] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ selected: se })
  }

  componentDidMount() {
    let that = this
    /*axios.post("/SHOULDFAIL", {
      "userID": this.props.uid
    }).then(function (response) {
      //console.log(response.data)
      if (response.data.status) {*/
    let tempCard = []
    let tempSelected = []
    let item = [{ name: "hello", }, { name: "what",  }]
    for (let i in item) {
      tempCard.push(
        <Paper zDepth={2} key={i}>
          <ListItem
            primaryText={item[i].name}
            rightIcon={<CommunicationChatBubble />}
            /*leftAvatar={
              <Avatar
                size={32}
              >
                {item[i].name[0]}
            </Avatar>
            }*/
            onClick={() => that.handleClick(i)}
            //secondaryText={item[i].lastmessage}
            value={i}
            hoverColor='#F95498B0'
            {...this.state.selected[i]}
          />
        </Paper>
      )
      tempSelected.push(null)
    }
    that.setState({ cards: tempCard, selected: tempSelected})
    /*}
  }).catch(function (error) {
    console.log(error);
  })*/
  }


  render() {
    return (
      <Col xsHidden sm={2} lg={2} className='side-bar'>
        <div className='img-div'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </div>
        <hr />
        {/* <Subheader>Chats</Subheader> */}
        <List>
          {this.state.cards}
        </List>
      </Col>
    );
  }
}

export default Sidebar;