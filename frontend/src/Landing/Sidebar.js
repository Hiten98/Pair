import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Paper, Drawer } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'
import CreateGroupChat from './CreateGroupChat'
import axios from 'axios'
import InviteChat from './InviteChat'
import AddLocationModal from './BottomBar/AddLocationModal'
import AddEmployeeModal from './BottomBar/AddEmployeeModal'
import './Sidebar.css';
import history from '../history';
import AddIntern from './BottomBar/AddIntern';
import LeaveChatButton from './MainWindow/Chat/LeaveChatButton';



class Sidebar extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    tempArr[parseInt(props.state.currChat)] = { style: { backgroundColor: 'var(--color2)', } }
    this.state = {
      cards: [],
      colors: tempArr,
      chatToAccept: '',
      open: false,
      index: '',
      type: '',
      verified: 'false',
      pin: '',
    }
    // console.log(props)
  }

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
    this.props.changeDrawerStatus()
    let that = this
    if (name.charAt(0) == 3 || name.charAt(0) == 4) {
      axios.post("/GET-INVITES", {
        "userID": this.props.uid,
        chatroomName: name
      }).then(function (response) {
        // console.log(response.data)
        if (response.data.invite_status != false) {
          let tempArr = that.state.colors
          tempArr[parseInt(that.props.state.currChat)] = null
          tempArr[parseInt(i)] = { style: { backgroundColor: 'var(--color2)' } }
          that.setState({ colors: tempArr }, that.changeColors)
          that.props.changeChat(parseInt(i), name, type)
        } else {
          that.setState({ open: true, chatToAccept: name, index: i, type: type })
        }
      }).catch(function (error) {
        console.log(error);
      })
    } else {
      let tempArr = that.state.colors
      tempArr[parseInt(that.props.state.currChat)] = null
      tempArr[parseInt(i)] = { style: { backgroundColor: 'var(--color2)' } }
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
        tempArr[parseInt(that.state.index)] = { style: { backgroundColor: 'var(--color2)' } }
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
        <Paper zDepth={2} key={i} className='color-pages'>
          <ListItem
            primaryText={this.state.cards[i].props.children.props.primaryText}
            className={this.state.cards[i].props.children.props.className}
            rightIcon={<CommunicationChatBubble />}
            onClick={this.state.cards[i].props.children.props.onClick}
            value={i}
            // hoverColor=''
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
    // this.setState({cards:[]})
    if (this.props.uid != null && history.location.pathname.indexOf('/landing/company') != 0 && history.location.pathname.indexOf('/landing/admin') != 0) {
      axios.post("/GET-CHATROOM", {
        "userID": this.props.uid
      }).then(function (response) {
        // console.log(response.data)
        for (let i in response.data) {
          // console.log(response.data[i].charAt(0))
          if((history.location.pathname.indexOf('/landing/intern/housing')===0||history.location.pathname.indexOf('/landing/intern/saved')===0)
            &&(response.data[i].charAt(0)==='1'|| response.data[i].charAt(0)==='2'))
            continue;
          let k = tempCard.length
          tempCard.push(
            <Paper zDepth={2} key={i} className='color-pages'>
              <ListItem
                primaryText={response.data[i].substring(1)}
                className={response.data[i]}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => that.handleClick(k, response.data[i], response.data[i].substring(0, 1))}
                value={i}
                // hoverColor='#F95498B0'
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
    } else if (history.location.pathname.indexOf('/landing/company') == 0) {
      axios.post('/GET-COMPANY-FROM-NAME', {
        "name": this.props.uid
      }).then(function (response) {
        //console.log(response.data);
        that.setState({ pin: response.data.pin, verified: response.data.verified })

      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  addMasterList = () => {
    let that = this
    let tempCard = this.state.cards
    if (history.location.pathname.indexOf('/landing/employee/members') == 0 && this.props.type == 'employee') {
      // console.log('hi')
      let k = tempCard.length
      tempCard.push(
        <Paper zDepth={2} key={that.state.cards.length} className='color-pages'>
          <ListItem
            primaryText='Intern Master List'
            className='0Intern Master List'
            rightIcon={<CommunicationChatBubble />}
            onClick={() => this.handleClick(k, '0Intern Master List', 0)}
            value={0}
            // hoverColor='#F95498B0'
            {...this.state.colors[k]}
          />
        </Paper>
      )
    }
    that.setState({ cards: tempCard }, this.state.cards[0].props.children.props.onClick)
  }

  renderDesktop() {
    return (
      <Col xsHidden sm={2} lg={2} className='side-bar'>
        <div className='img-div'>
          <img src={wordLogo} alt="logo" className='no-word-logo' />
        </div>
        <hr className='divider-desktop'/>
        <div className='sidebar-list'>
          <List style={{ marginTop: '-8px' }}>
            {this.state.cards}
          </List>
        </div>

        <InviteChat {...this.props} {...this.state} closeModal={this.closeModal} acceptedChat={this.acceptedChat} />

        {(this.props.type == 'intern') ? <CreateGroupChat {...this.props} /> : (this.props.type=='employee')?<AddIntern {...this.props}/>:null}
      </Col>
    );
  }

  renderMobile = () => {
    if (history.location.pathname.indexOf('/landing/admin') != 0) {
      return (
        <Drawer
          open={this.props.state.drawerOpen}
          docked={false}
          disableSwipeToOpen
          onRequestChange={() => { this.props.changeDrawerStatus() }}
        >
          <div className='img-div'>
            <img src={wordLogo} alt="logo" className='no-word-logo' />
          </div>
          <hr />
          <div style={{ height: '71vh', overflowY: 'auto', overflowX: 'hidden' }}>
            <List style={{ marginTop: '-1vh' }}>
              {this.state.cards}
            </List>
          </div>


          <InviteChat {...this.props} {...this.state} closeModal={this.closeModal} acceptedChat={this.acceptedChat} />

          <div>
            {(this.props.type != "admin" && this.props.type != "company") ? <LeaveChatButton {...this.props} {...this.state} /> : null}
            <br />
            {(this.props.type == 'intern') ? <CreateGroupChat {...this.props} /> : (this.props.type=='employee')?<AddIntern {...this.props}/>:null}
          </div>
          {(this.props.type == 'company') ?
            <div style={{ marginTop: '-80vh' }}>
              <Col sm={12} >
                <AddEmployeeModal {...this.state} />
              </Col>
              <Col sm={12}>
                {this.state.verified != 'true' ? <p style={{ marginTop: '5%' }}>Add employee is disabled until an admin reviews and accepts your company</p> : null}
              </Col>
              <Col sm={12}>
                <AddLocationModal companyName={this.props.uid} />
              </Col>
            </div>
            : null}
        </Drawer>
      )
    } else
      return null
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      return this.renderMobile();
    } else {
      return this.renderDesktop();
    }
  }
}

export default Sidebar;