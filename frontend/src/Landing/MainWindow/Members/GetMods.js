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
    if (this.props.props.state.currChatName != nextProps.props.state.currChatName) {
      //console.log(this.props.props.state.currChatName)
      let that = this
      let profileAdj=1
      if (nextProps.props.state.currChatName.substring(0, 1) == 1) {
        axios.post('/GET-MODS-IN-CHATROOM', {
          "chatroomName": nextProps.props.state.currChatName,
        }).then(function (response) {
          let tempMod = []
          for (let i in response.data) {
            let splitted = response.data[i].split('$:$')
            if (splitted[0] == nextProps.props.uid) {
              profileAdj--
              that.props.changeUrl(splitted[2])
              continue
            }
            that.props.props.addPerson(splitted[1])
            let tempProfileAdj=profileAdj
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
                  {...that.state.colors[parseInt(i) + 1]}
                  primaryText={splitted[1]}
                  secondaryText={<p>{bio}</p>}
                  secondaryTextLines={1}
                  hoverColor='#F95498B0'
                  onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj, splitted[0]) }}
                />
              </Paper>
            )
          }
          that.setState({ mods: tempMod })
          that.props.changeModNum(tempMod.length)
        }).catch(function (error) {
          console.log(error);
        })
      }
    }
    if(this.props.props2.currPaper!=nextProps.props2.currPaper){
      let tempArr = []
      // console.log(props.props2.currPaper)
      tempArr[this.props.props2.currPaper] = null
      tempArr[nextProps.props2.currPaper] = { style: { backgroundColor: '#EB347F' } }
      this.setState({colors:tempArr},this.changeColors)
    }
  }

  componentDidMount = () => {
    //console.log(this.props.props.state.currChatName)
    let that = this
    let profileAdj=1
    if (this.props.props.state.currChatName.substring(0, 1) == 1) {
      axios.post('/GET-MODS-IN-CHATROOM', {
        "chatroomName": this.props.props.state.currChatName,
      }).then(function (response) {
        let tempMod = []
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[0] == that.props.props.uid) {
            profileAdj--
            that.props.changeUrl(splitted[2])
            continue
          }
          that.props.props.addPerson(splitted[1])
          let tempProfileAdj=profileAdj
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
                {...that.state.colors[parseInt(i) + 1]}
                primaryText={splitted[1]}
                secondaryText={<p>{bio}</p>}
                secondaryTextLines={1}
                hoverColor='#F95498B0'
                onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj, splitted[0]) }}
              />
            </Paper>
          )
        }
        that.setState({ mods: tempMod })
        that.props.changeModNum(tempMod.length)
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  changeColors = () => {
    let that = this
    let tempArr = []
    for (let i in this.state.mods) {
      //console.log(this.state.interns[i])
      tempArr.push(
        <Paper zDepth={2} key={i} className='paper-list'>
          <ListItem
            leftAvatar={this.state.mods[i].props.children.props.leftAvatar}
            primaryText={this.state.mods[i].props.children.props.primaryText}
            secondaryText={this.state.mods[i].props.children.props.secondaryText}
            secondaryTextLines={1}
            onClick={this.state.mods[i].props.children.props.onClick}
            hoverColor='#F95498B0'
            {...that.state.colors[parseInt(i) + 1]}
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

  render() {
    return (this.state.mods);
  }
}

export default GetMods;