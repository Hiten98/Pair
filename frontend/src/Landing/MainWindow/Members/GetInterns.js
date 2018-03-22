import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import axios from 'axios'
import {Avatar,Paper,ListItem } from 'material-ui'
import { lightGreenA700, yellow800, red500 } from 'material-ui/styles/colors';
//import './LandingScreen.css';

class GetInterns extends Component {
  constructor(props){
    super(props)
    this.state={
      interns:[]
    }
  }

  componentDidMount=()=>{
    let that=this
    //Gets users in chatroom
    axios.post('/GET-USERS-IN-CHATROOM', {
      "chatroomName": this.props.props.state.currChatName,
    }).then(function (response) {
      let tempintern = []
      for (let i in response.data) {
        let splitted = response.data[i].split('$:$')
        if (splitted[1] == '' || splitted[1] == 'undefined') {
          continue
        }
        if (splitted[0] == that.props.props.uid) {
          that.props.changeUrl(splitted[2])
          continue
        }
        let bio = ''
        for (let e = 3; e < splitted.length; e++) {
          if (splitted[e] != 'undefined')
            bio += splitted[e]
        }
        //compares current intern to the shown one
        axios.post('/COMPARE-INTERNS', {
          userID1: that.props.props.uid,
          userID2: splitted[0]
        }).then(function (response) {
          //console.log(response)
          //adds color to the score
          let score = ''
          if (parseInt(response.data.score) > 80) {
            score = <span style={{ color: lightGreenA700 }}>{response.data.score}</span>
          } else if (parseInt(response.data.score) > 50) {
            score = <span style={{ color: yellow800 }}>{response.data.score}</span>
          } else {
            score = <span style={{ color: red500 }}>{response.data.score}</span>
          }
          //checks if there are undefined
          let args = {}
          if (splitted[2] != 'undefined') {
            args['leftAvatar'] = <Avatar src={splitted[2]} />
          } else {
            args['leftAvatar'] = <Avatar >{splitted[1].substring(0, 1)}</Avatar>
          }

          tempintern.push(
            <Paper zDepth={2} key={i} className='paper-list'>
              <ListItem
                {...args}
                primaryText={splitted[1]}
                secondaryText={<p>{score}% match {bio}</p>}
                secondaryTextLines={1}
                onClick={() => { that.handleClick(parseInt(i) + 1 + that.state.mods.length(), splitted[0]) }}
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
      <div>
        {this.state.interns}
      </div>
    );
  }
}

export default GetInterns;