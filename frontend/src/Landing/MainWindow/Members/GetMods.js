import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Avatar, ListItem, Paper } from 'material-ui'
import axios from 'axios'
//import './GetMods.css';

class GetMods extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mods: [],
    }
  }

  componentDidMount = () => {
    this.setState({ props: this.props })
    console.log(this.props.props.state.currChatName)
    let that = this
    if (this.props.props.state.currChatName.substring(0, 1) == 1) {
      axios.post('/GET-MODS-IN-CHATROOM', {
        "chatroomName": this.props.props.state.currChatName,
      }).then(function (response) {
        let tempMod = []
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[0] == that.props.props.uid) {
            that.props.changeUrl(splitted[2])
            continue
          }
          let bio = ''
          for (let e = 3; e < splitted.length; e++) {
            bio += splitted[e]
          }
          let args = {}
          if (splitted[2] != 'undefined') {
            args['leftAvatar'] = <Avatar src={splitted[2]} />
          } else {
            args['leftAvatar'] = <Avatar >{splitted[1].substring(0, 1)}</Avatar>
          }
          tempMod.push(
            <Paper zDepth={2} key={i} className='paper-list'>
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
  }

  render() {
    return (
      <div>
        {this.state.mods}
      </div>
    );
  }
}

export default GetMods;