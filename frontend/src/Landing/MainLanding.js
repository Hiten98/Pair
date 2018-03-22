import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import BottomBar from './BottomBar'
import Sidebar from './Sidebar'
import Toolbar from './TopBar/Toolbar'
import MainArea from './MainWindow/MainArea'
import axios from 'axios'
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
      currIntern:{},
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
    
  }

  componentDidMount = () => {
    let that = this
    let name=''
    let distance=''
    let smoke=''
    if (this.props.type == 'intern') {
      axios.post('/GET-INTERN', {
        userID:that.props.uid,
      }).then(function (response) {
        //console.log(response.data)
        name=response.data.firstName
        distance=response.data.housing.desiredDistance
        smoke=response.data.roommate.smoke
        that.setState({currIntern:response.data})
      }).then(()=>{
        if(name==''||distance==''||smoke==''){
          alert('Please fill out all pages of the form before continuing to the application')
          history.push('/register/intern/preferences/user-details')
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
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
    this.setState({ currChat: newChat, currChatName: namem, currType: type }, ()=>{this.saveState()})
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