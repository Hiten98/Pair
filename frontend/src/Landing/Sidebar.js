import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Subheader, Paper } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import axios from 'axios'
import './Sidebar.css';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class Sidebar extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    tempArr[parseInt(props.state.currChat) - 1] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      cards: [],
      colors: tempArr,
    }
  }

  stylePressed = '#EB347F'

  styleNoPressed = 'white'


  handleClick = (i,name,type) => {
    let tempArr = this.state.colors
    tempArr[parseInt(this.props.state.currChat) - 1] = null
    tempArr[parseInt(i)] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.changeChat(parseInt(i) + 1,name,type)
  }

  changeColors = () => {
    //The below code is what finally got the chats to refresh with the right colors after a button click
    let that = this
    let tempCard = []
    for (let i in this.state.cards) {
      // console.log(this.state.cards[i])
      tempCard.push(
        <Paper zDepth={2} key={i}>
          <ListItem
            primaryText={this.state.cards[i].props.children.props.primaryText}
            className={this.state.cards[i].props.children.props.className}
            rightIcon={<CommunicationChatBubble />}
            onClick={() => that.handleClick(i,this.state.cards[i].props.children.props.className,this.state.cards[i].props.children.props.className.substring(0,1))}
            value={i}
            hoverColor='#F95498B0'
            {...that.state.colors[i]}
          />

        </Paper>
      )

    }
    that.setState({ cards: tempCard })
  }

  componentDidMount() {
    let that = this
    if (this.props.uid != null) {
      axios.post("/GET-CHATROOM", {
        "userID": this.props.uid
      }).then(function (response) {
        // console.log(response.data)
        // if (response.data.status) {
        let tempCard = []
        let tempPushed = []
        for (let i in response.data) {
          tempPushed.push(that.styleNoPressed)
          that.setState({ pressed: tempPushed })
        }

        for (let i in response.data) {
          //console.log(response.data[i])
          tempCard.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                primaryText={response.data[i].substring(1)}
                className={response.data[i]}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => that.handleClick(i,response.data[i],response.data[i].substring(0,1))}
                value={i}
                hoverColor='#F95498B0'
                {...that.state.colors[i]}
              />

            </Paper>
          )
          that.setState({ cards: tempCard })
        }
        // }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  render() {
    return (
      <Col xsHidden sm={2} lg={2} className='side-bar'>
        <div className='img-div'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </div>
        <hr />
        <List>
          {this.state.cards}
        </List>
      </Col>
    );
  }
}

export default Sidebar;