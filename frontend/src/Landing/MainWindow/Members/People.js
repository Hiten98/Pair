import React, { Component } from 'react';
import { Paper, ListItem, Avatar } from 'material-ui'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import './People.css';
import { lightGreenA400 } from 'material-ui/styles/colors';
import { yellow500 } from 'material-ui/styles/colors';
import { red500 } from 'material-ui/styles/colors';

class People extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mods: [],
      interns: [],
      myURL: '',
    }
  }

  handleClick=(i,uid)=>{
    //TODO: do what i did in the sidebar
    this.props.changeSelected(uid)
  }

  componentDidMount = () => {
    let that = this
    if (this.props.state.currChatName.substring(0, 1) == 1) {
      axios.post('/GET-MODS-IN-CHATROOM', {
        "chatroomName": this.props.state.currChatName,
      }).then(function (response) {
        let tempMod = []
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[0] == that.props.uid) {
            that.setState({ myURL: splitted[2] })
            continue
          }
          let bio = ''
          for (let e = 3; e < splitted.length(); e++) {
            bio += splitted[e]
          }
          tempMod.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                leftAvatar={<Avatar src={splitted[2]} />}
                primaryText={splitted[1]}
                secondaryText={<p>{bio}</p>}
                secondaryTextLines={1}
                onClick={() => { that.handleClick(parseInt(i) + 1, splitted[0]) }}
              />
            </Paper>
          )
        }
        that.setState({ mods: tempMod })
      }).catch(function (error) {
        console.log(error);
      })
    }
    //Gets users in chatroom
    axios.post('/GET-USERS-IN-CHATROOM', {
      "chatroomName": this.props.state.currChatName,
    }).then(function (response) {
      let tempintern = []
      for (let i in response.data) {
        let splitted = response.data[i].split('$:$')
        if (splitted[0] == that.props.uid) {
          that.setState({ myURL: splitted[2] })
          continue
        }
        let bio = ''
        for (let e = 3; e < splitted.length(); e++) {
          bio += splitted[e]
        }
        //compares current intern to the shown one
        axios.post('/COMPARE-INTERNS', {
          userID1: that.props.uid,
          userID2: splitted[0]
        }).then(function (response) {
          let score = ''
          if (parseInt(response.data.score) > 80) {
            score = <span style={{ color: lightGreenA400 }}>{response.data.score}</span>
          } else if (parseInt(response.data.score) > 50) {
            score = <span style={{ color: yellow500 }}>{response.data.score}</span>
          } else {
            score = <span style={{ color: red500 }}>{response.data.score}</span>
          }
          tempintern.push(
            <Paper zDepth={2} key={i}>
              <ListItem
                leftAvatar={<Avatar src={splitted[2]} />}
                primaryText={splitted[1]}
                secondaryText={<p>{score}% match {bio}</p>}
                secondaryTextLines={1}
                onClick={() => { that.handleClick(parseInt(i) + 1 + that.state.mods.length(),splitted[0]) }}
              />
            </Paper>
          )
        }).catch(function (error) {
          console.log(error);
        })
      }
      that.setState({ interns: tempintern })
    }).catch(function (error) {
      console.log(error);
    })


  }

  render() {
    return (
      <Col xs={3} className='list-column'>
        <Paper zDepth={2}>
          <ListItem
            leftAvatar={<Avatar src={this.state.myURL} />}
            primaryText='My Profile'
            onClick={() => { this.handleClick(0,this.props.uid) }}
          />
        </Paper>
        {this.state.mods}
        {this.state.interns}
      </Col>
    );
  }
}

export default People;