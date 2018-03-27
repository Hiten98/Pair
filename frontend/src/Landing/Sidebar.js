import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Subheader, Paper } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import CreateGroupChat from './CreateGroupChat'
import axios from 'axios'
import InviteChat from './InviteChat'
import './Sidebar.css';
import history from '../history';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class Sidebar extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    tempArr[parseInt(props.state.currChat)] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      cards: [],
      colors: tempArr,
      chatToAccept: '',
      open: false,
      index: '',
      type: '',
    }
  }

  stylePressed = '#EB347F'

  styleNoPressed = 'white'

  closeModal = () => {
    let that = this
    this.setState({ open: false })
    axios.post("/REMOVE-FROM-CHAT", {
      "userID": this.props.uid,
      chatroomName: this.state.chatToAccept,
    }).then(function (response) {
      if (response.data.status) {
        that.props.changeNeedToUpdate()
      } else {
        that.props.changeNeedToUpdate()
        alert('Error: please choose again')
      }
      that.setState({ open: false })
    }).catch(function (error) {
      console.log(error);
    })
  }

  handleClick = (i, name, type) => {
    // console.log(i)
    // console.log(name)
    let that = this
    if (name.charAt(0) == 3 || name.charAt(0) == 4) {
      axios.post("/GET-INVITES", {
        "userID": this.props.uid,
        chatroomName: name
      }).then(function (response) {
        // console.log(response.data)
        if (response.data.invite_status) {
          let tempArr = that.state.colors
          tempArr[parseInt(that.props.state.currChat)] = null
          tempArr[parseInt(i)] = { style: { backgroundColor: '#EB347F' } }
          that.setState({ colors: tempArr }, that.changeColors)
          that.props.changeChat(parseInt(i), name, type)
        } else if (response.data.invite_status==false) {
          that.setState({ open: true, chatToAccept: name, index: i, type: type })
        }
      }).catch(function (error) {
        console.log(error);
      })
    } else {
      let tempArr = that.state.colors
      tempArr[parseInt(that.props.state.currChat)] = null
      tempArr[parseInt(i)] = { style: { backgroundColor: '#EB347F' } }
      that.setState({ colors: tempArr }, that.changeColors)
      that.props.changeChat(parseInt(i), name, type)
    }
  }

  acceptedChat = () => {
    let that = this
    axios.post("/ACCEPT-INVITE", {
      "userID": this.props.uid,
      chatroomName: this.state.chatToAccept,
    }).then(function (response) {
      if (response.data.status) {
        let tempArr = that.state.colors
        tempArr[parseInt(that.props.state.currChat)] = null
        tempArr[parseInt(that.state.index)] = { style: { backgroundColor: '#EB347F' } }
        that.setState({ colors: tempArr }, that.changeColors)
        that.props.changeChat(parseInt(that.state.index), that.state.chatToAccept, that.state.type)
      } else {
        that.props.changeNeedToUpdate()
        alert('Error: please choose again')
      }
      that.setState({ open: false })
    }).catch(function (error) {
      console.log(error);
    })
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
            onClick={this.state.cards[i].props.children.props.onClick}
            value={i}
            hoverColor='#F95498B0'
            {...that.state.colors[i]}
          />

        </Paper>
      )

    }
    that.setState({ cards: tempCard })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.state.needToUpdate != nextProps.state.needToUpdate && history.location.pathname.indexOf('/landing/company') != 0) {
      // console.log('hi')
      this.componentDidMount()
      this.render()
    }
  }

  componentDidMount() {
    let that = this
    let tempCard = []
    if (this.props.uid != null && history.location.pathname.indexOf('/landing/company') != 0) {
      axios.post("/GET-CHATROOM", {
        "userID": this.props.uid
      }).then(function (response) {
        // console.log(response.data)
        let tempPushed = []
        for (let i in response.data) {
          tempPushed.push(that.styleNoPressed)
          that.setState({ pressed: tempPushed })
        }

        for (let i in response.data) {
          //console.log(response.data[i])
          let k = tempCard.length
          tempCard.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                primaryText={response.data[i].substring(1)}
                className={response.data[i]}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => that.handleClick(k, response.data[i], response.data[i].substring(0, 1))}
                value={i}
                hoverColor='#F95498B0'
                {...that.state.colors[k]}
              />

            </Paper>
          )
          that.setState({ cards: tempCard })
        }
        that.setState({ cards: tempCard }, that.addMasterList)
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  addMasterList = () => {
    let that = this
    let tempCard = this.state.cards
    if (history.location.pathname.indexOf('/landing/employee/members') == 0 && this.props.type == 'employee') {
      let k = tempCard.length
      tempCard.push(
        <Paper zDepth={2} key={that.state.cards.length}>
          <ListItem
            primaryText='Intern Master List'
            className='0Intern Master List'
            rightIcon={<CommunicationChatBubble />}
            onClick={() => this.handleClick(k, '0Intern Master List', 0)}
            value={0}
            hoverColor='#F95498B0'
            {...this.state.colors[k]}
          />
        </Paper>
      )
    }
    that.setState({ cards: tempCard }, this.state.cards[0].props.children.props.onClick)
  }

  render() {
    return (
      <Col xsHidden sm={2} lg={2} className='side-bar'>
        <div className='img-div'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </div>
        <hr />
        <div style={{ height: '81vh', overflowY: 'auto', overflowX: 'hidden' }}>
          <List style={{ marginTop: '-1vh' }}>
            {this.state.cards}
          </List>
        </div>

        <InviteChat {...this.props} {...this.state} closeModal={this.closeModal} acceptedChat={this.acceptedChat} />

        {(history.location.pathname.indexOf('/landing/company') != 0) ? <CreateGroupChat {...this.props} /> : <div></div>}
      </Col>
    );
  }
}

export default Sidebar;