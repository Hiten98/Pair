import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { Avatar, Paper, ListItem } from 'material-ui'
import { lightGreenA700, yellow800, red500 } from 'material-ui/styles/colors';
//import './LandingScreen.css';

class GetInterns extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    // console.log(props.props2.currPaper)
    tempArr[props.props2.currPaper] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      interns: [],
      uidList: [],
      colors: tempArr,
    }
    // console.log(props)
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log(this.props.props.state.currChatName)
    // console.log(nextProps.props.state.currChatName)
    if (this.props.props.state.currChatName != nextProps.props.state.currChatName || this.props.props.state.needToUpdate != nextProps.props.state.needToUpdate) {
      this.setState({ interns: [] })
      if (nextProps.props.type == 'employee' && nextProps.props.state.currChatName == '0Intern Master List') {
        // console.log('hi')
        this.internMasterList(nextProps, this)
      } else {
        //Gets users in chatroom
        this.callGetInterns(nextProps, this)
      }
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
    if (props.props.state.currChatName == '')
      return
    axios.post('/GET-USERS-IN-CHATROOM', {
      "chatroomName": props.props.state.currChatName,
      userID: props.props.uid,
    }).then(function (response) {
      // console.log(response.data)
      // console.log(props.props.state.currChatName)
      if (response.data.status == false) {
        alert('No longer in this room, please choose a different chat room')
        props.props.changeNeedToUpdate
      } else {
        let tempintern = []
        let tempUid = []
        let profileAdj = 200
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[1] == '' || splitted[1] == 'undefined' || splitted[1] == 'undefined undefined') {
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

          tempintern.push(
            <Paper zDepth={2} key={parseInt(i) + tempProfileAdj} className='paper-list'>
              <ListItem
                {...args}
                {...that.state.colors[parseInt(i) + tempProfileAdj]}
                primaryText={splitted[1]}
                secondaryText={<p>{bio.substr(0,20)}...</p>}
                secondaryTextLines={1}
                hoverColor='#F95498B0'
                onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj, splitted[0]) }}
              />
            </Paper>
          )
          tempUid.push(splitted[0])
        }
        that.setState({ interns: tempintern, uidList: tempUid }, () => { that.getScores(props, that, tempintern) })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  getScores = (props, that, tempintern) => {
    // console.log(that.state.uidList)
    if (props.props.type == 'intern' && that.state.uidList.length != 0) {
      axios.post('/COMPARE-INTERNS', {
        userID1: props.props.uid,
        userID2: that.state.uidList,
      }).then(function (response) {
        // console.log(response.data)
        // console.log(tempintern)
        let tempArr = []
        let score = null

        for (let i in response.data.score) {
          if (parseInt(response.data.score[i]) > 80) {
            score = <div><span style={{ color: lightGreenA700 }}>{response.data.score[i]}% match &nbsp;</span> {tempintern[parseInt(i)].props.children.props.secondaryText}</div>
          } else if (parseInt(response.data.score[i]) > 50) {
            score = <div><span style={{ color: yellow800 }}>{response.data.score[i]}% match&nbsp; </span> {tempintern[parseInt(i)].props.children.props.secondaryText}</div>
          } else if (parseInt(response.data.score[i]) > 0) {
            score = <div><span style={{ color: red500 }}>{response.data.score[i]}% match&nbsp;</span> {tempintern[parseInt(i)].props.children.props.secondaryText}</div>
          } else {
            score = ''
          }
          tempArr.push(
            <Paper zDepth={2} key={tempintern[i].key} className='paper-list'>
              <ListItem
                leftAvatar={tempintern[parseInt(i)].props.children.props.leftAvatar}
                primaryText={tempintern[parseInt(i)].props.children.props.primaryText}
                secondaryText={score}
                secondaryTextLines={1}
                onClick={tempintern[parseInt(i)].props.children.props.onClick}
                hoverColor='#F95498B0'
                {...that.state.colors[tempintern[i].key]}
              />
            </Paper>
          )
        }
        that.setState({ interns: tempArr })
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  componentDidMount = () => {
    // console.log(this.props.props)
    if (this.props.props.type == 'employee' && this.props.props.state.currChatName == '0Intern Master List') {
      // console.log('hi')
      this.internMasterList(this.props, this)
    } else {
      //Gets users in chatroom
      this.callGetInterns(this.props, this)
    }
  }

  internMasterList = (props, that) => {
    let tempArr = []
    axios.post('/GET-MASTER-LIST', {
      userID: this.props.props.uid
    }).then(function (response) {
      // console.log(response.data)
      let k = 0
      for (let i in response.data) {
        if (response.data[i].firstName == 'undefined')
          continue
        tempArr.push(
          <Paper zDepth={2} key={parseInt(k) + 1} className='paper-list'>
            <ListItem
              primaryText={`${response.data[i].firstName} ${response.data[i].lastName}`}
              onClick={() => { that.handleClick(parseInt(k) + 1, i) }}
            />
          </Paper>
        )
        k++
      }
      that.setState({ interns: tempArr })
    }).catch(function (error) {
      console.log(error);
    });
  }

  changeColors = () => {
    let that = this
    let tempArr = []
    for (let i in this.state.interns) {
      tempArr.push(
        <Paper zDepth={2} key={this.state.interns[i].key} className='paper-list'>
          <ListItem
            leftAvatar={this.state.interns[i].props.children.props.leftAvatar}
            primaryText={this.state.interns[i].props.children.props.primaryText}
            secondaryText={this.state.interns[i].props.children.props.secondaryText}
            secondaryTextLines={1}
            onClick={this.state.interns[i].props.children.props.onClick}
            hoverColor='#F95498B0'
            {...that.state.colors[this.state.interns[i].key]}
          />
        </Paper>
      )
    }
    this.setState({ interns: tempArr })
  }

  handleClick = (i, id) => {
    //console.log(i)
    let tempArr = this.state.colors
    tempArr[this.props.props2.currPaper] = null
    tempArr[i] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.props2.changeSelected(id, i)
  }

  internReturn = () => {
    if (this.props.props.state.currChatName.charAt(0) == 1 && this.state.interns.length > 0) {
      return (
        <div>
          <Paper zDepth={2} key={-1} className='paper-list title-list' style={{ backgroundColor: '#50C2C4' }}><h4>Interns</h4></Paper>
          {this.state.interns}
        </div>
      )
    } else {
      return (this.state.interns)
    }
  }

  render() {
    return (this.internReturn());
  }
}

export default GetInterns;