import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import wordLogo from '../images/word_no_logo.png'
import { List, ListItem, Subheader, Paper } from 'material-ui'
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble'

import axios from 'axios'
import './Sidebar.css';

axios.defaults.baseURL = 'http://localhost:9090'

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [],
      pressed: [],
    }
  }

  stylePressed= '#EB347F'

  styleNoPressed='white'


  handleClick = (i) => {
    let se = this.state.pressed
    se[i] = this.stylePressed
    this.setState({ pressed: se })
    console.log(se)
  }

  componentDidMount() {
    let that = this
    axios.post("/GET-CHATROOM", {
      "userID": this.props.uid
    }).then(function (response) {
      //console.log(response.data)
      // if (response.data.status) {
        let tempCard = []
        let tempPushed = []
        for(let i in response.data){
          tempPushed.push(that.styleNoPressed)
          that.setState({pressed:tempPushed})
        }
        
        for (let i in response.data) {
          //console.log(response.data[i])
          tempCard.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                primaryText={response.data[i]}
                className={`intro${i}`}
                rightIcon={<CommunicationChatBubble />}
                onClick={() => that.handleClick(i)}
                value={i}
                //style={{ backgroundColor:that.state.pressed[i]}}
                hoverColor='#F95498B0'
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