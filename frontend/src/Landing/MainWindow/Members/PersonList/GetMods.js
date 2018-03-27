import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Avatar, ListItem, Paper } from 'material-ui'
import axios from 'axios'
//import './GetMods.css';

class GetMods extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    // console.log(props.props2.currPaper)
    tempArr[props.props2.currPaper] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      mods: [],
      colors: tempArr,
    }
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log(this.props.props.state.currChatName)
    // console.log(nextProps.props.state.currChatName)
    if (this.props.props.state.currChatName != nextProps.props.state.currChatName || this.props.props.state.needToUpdate != nextProps.props.state.needToUpdate) {
      this.setState({ mods: [] })
      //Gets users in chatroom
      this.callGetInterns(nextProps, this)
    }
    if (this.props.props2.currPaper != nextProps.props2.currPaper) {
      let tempArr = []
      // console.log(props.props2.currPaper)
      tempArr[this.props.props2.currPaper] = null
      tempArr[nextProps.props2.currPaper] = { style: { backgroundColor: '#EB347F' } }
      this.setState({ colors: tempArr }, this.changeColors)
    }
  }

  callGetInterns = (props, that) => {
    axios.post('/GET-MODS-IN-CHATROOM', {
      "chatroomName": props.props.state.currChatName,
      userID: props.props.uid,
    }).then(function (response) {
      if (response.data.status != false) {
        let tempmod = []
        let tempUid = []
        let profileAdj = 100
        // console.log(response.data)
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[1] == '' || splitted[1] == 'undefined') {
            continue
          }
          if (splitted[0] == props.props.uid) {
            profileAdj--
            props.changeUrl(splitted[2])
            continue
          }
          props.props.addPerson(splitted[1])
          let tempProfileAdj = profileAdj
          let bio = ''
          for (let e = 3; e < splitted.length; e++) {
            if (splitted[e] != 'undefined')
              bio += splitted[e]
          }
          //compares current intern to the shown one

          //console.log(response)
          //adds color to the score

          //checks if there are undefined
          let args = {}
          if (splitted[2] != 'undefined') {
            args['leftAvatar'] = <Avatar src={splitted[2]} />
          } else {
            args['leftAvatar'] = <Avatar >{splitted[1].substring(0, 1)}</Avatar>
          }

          tempmod.push(
            <Paper zDepth={2} key={parseInt(i) + tempProfileAdj} className='paper-list'>
              <ListItem
                {...args}
                {...that.state.colors[parseInt(i) + tempProfileAdj]}
                primaryText={splitted[1]}
                secondaryText={<p>{bio.substr(0, 20)}...</p>}
                secondaryTextLines={1}
                hoverColor='#F95498B0'
                onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj, splitted[0]) }}
              />
            </Paper>
          )
        }
        that.setState({ mods: tempmod })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  changeColors = () => {
    let that = this
    let tempArr = []
    for (let i in this.state.mods) {
      // console.log(this.state.mods[i])
      tempArr.push(
        <Paper zDepth={2} key={this.state.mods[i].key} className='paper-list'>
          <ListItem
            leftAvatar={this.state.mods[i].props.children.props.leftAvatar}
            primaryText={this.state.mods[i].props.children.props.primaryText}
            secondaryText={this.state.mods[i].props.children.props.secondaryText}
            secondaryTextLines={1}
            onClick={this.state.mods[i].props.children.props.onClick}
            hoverColor='#F95498B0'
            {...that.state.colors[this.state.mods[i].key]}
          />
        </Paper>
      )
    }
    this.setState({ mods: tempArr })
  }

  handleClick = (i, id) => {

    let tempArr = this.state.colors
    tempArr[this.props.props2.currPaper] = null
    tempArr[i] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.props2.changeSelected(id, i)
  }

  modReturn = () => {
    if (this.props.props.state.currChatName.charAt(0) == 1 && this.state.mods.length > 0) {
      return (
        <div>
          <Paper zDepth={2} key={-1} className='paper-list title-list' style={{ backgroundColor: '#50C2C4' }}><h4>Moderators</h4></Paper>
          {this.state.mods}
        </div>
      )
    } else {
      return (this.state.mods)
    }
  }

  render() {
    return (this.modReturn());
  }
}

export default GetMods;