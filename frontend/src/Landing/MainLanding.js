import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import BottomBar from './BottomBar/BottomBar'
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
      currIntern: {},
      people: [],
      needToUpdate:false,
      drawerOpen:true,
    }
    // try {
    //   const serializedState = localStorage.getItem('main-area')
    //   if (serializedState !== null) {
    //     this.state = JSON.parse(serializedState)
    //     //console.log(this.state)
    //   }
    // } catch (err) {
    //   console.log('This browser does not allow localstorage and some functionalities may be impacted')
    // }

  }

  changeDrawerStatus=()=>{
    this.setState({drawerOpen:!this.state.drawerOpen})
  }

  componentWillUnmount = () => {
    try {
      localStorage.removeItem('main-area')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  componentDidMount = () => {
    let that = this
    let name = ''
    let distance = ''
    let smoke = ''
    if (this.props.type == 'intern') {
      axios.post('/GET-INTERN', {
        userID: that.props.uid,
      }).then(function (response) {
        //console.log(response.data)
        name = response.data.firstName
        distance = response.data.housing.desiredDistance
        smoke = response.data.roommate.smoke
        that.setState({ currIntern: response.data })
      }).then(() => {
        if (name == '' || distance == '' || smoke == '') {
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

  addPerson = (name) => {
    let i = this.state.people
    if (i == undefined)
      i = []
    i.push(name)
    this.setState({ people: i })
    // console.log(this.state.people)
  }

  resetPeople=()=>{
    this.setState({people:[],})
  }

  changeChat = (newChat, namem, type) => {
    this.setState({ currChat: newChat, currChatName: namem, currType: type, people: [], }, () => { this.saveState() })
  }

  ifBottomBar = (toSend) => {
    // console.log(history.location.pathname)
    // console.log(history.location.pathname.indexOf(`/landing/${this.props.type}/chat`))
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/chat`) != 0)
      return <BottomBar {...toSend} />
  }

  changeNeedToUpdate=()=>{
    this.setState({needToUpdate:!this.state.needToUpdate})
  }

  render() {
    let toSend = {
      uid: this.props.uid,
      state: this.state,
      changePage: this.changePage,
      changeChat: this.changeChat,
      type: this.props.type,
      addPerson: this.addPerson,
      resetPeople:this.resetPeople,
      changeNeedToUpdate:this.changeNeedToUpdate,
      changeDrawerStatus:this.changeDrawerStatus,
    }
    return (
      <div className='whole'>
        <Sidebar {...toSend} />
        <Col xs={12} sm={10} lg={10} className='mainArea'>

          <Toolbar {...toSend} />

          <MainArea {...toSend} />

          {this.ifBottomBar(toSend)}
        </Col>
      </div>
    );
  }
}

export default LandingScreen;
