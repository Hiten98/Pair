import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import BottomBar from './BottomBar'
import Sidebar from './Sidebar'
import Toolbar from './TopBar/Toolbar'
import MainArea from './MainWindow/MainArea'
import './MainLanding.css';
import history from '../history';


class LandingScreen extends Component {
  constructor(props) {
    super(props)
    if (props.uid == null) {
      history.push('/')
    }
    this.state = {
      currChat: 0,
      currType: 0,
      currChatName: '',
    }
    try {
      const serializedState = localStorage.getItem('main-area')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    this.saveState()
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('main-area', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  changeChat = (newChat, namem, type) => {
    this.setState({ currChat: newChat, currChatName: namem, currType: type }, this.saveState)
  }

  render() {
    let toSend = {
      uid: this.props.uid,
      state: this.state,
      changePage: this.changePage,
      changeChat: this.changeChat,
      type: this.props.type,
    }
    return (
      <div className='whole'>
        <Sidebar {...toSend} />
        <Col xs={12} sm={10} lg={10} className='mainArea'>

          <Toolbar {...toSend} />

          <MainArea {...toSend} />

          <BottomBar {...toSend} />
        </Col>
      </div>
    );
  }
}

export default LandingScreen;