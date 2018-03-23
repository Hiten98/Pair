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
      colors: tempArr,
    }
    //console.log(props)
  }

  componentWillReceiveProps = (nextProps) => {
    //console.log(this.props.props.state.currChatName)
    //console.log(nextProps.props.state.currChatName)
    if (this.props.props.state.currChatName != nextProps.props.state.currChatName) {
      let that = this
      //Gets users in chatroom
      axios.post('/GET-USERS-IN-CHATROOM', {
        "chatroomName": nextProps.props.state.currChatName,
      }).then(function (response) {
        let tempintern = []
        let profileAdj = 1
        for (let i in response.data) {
          let splitted = response.data[i].split('$:$')
          if (splitted[1] == '' || splitted[1] == 'undefined') {
            continue
          }
          if (splitted[0] == nextProps.props.uid) {
            profileAdj--
            that.props.changeUrl(splitted[2])
            continue
          }
          let tempProfileAdj = profileAdj
          let bio = ''
          for (let e = 3; e < splitted.length; e++) {
            if (splitted[e] != 'undefined')
              bio += splitted[e]
          }
          /*//compares current intern to the shown one
          axios.post('/COMPARE-INTERNS', {
            userID1: that.props.props.uid,
            userID2: splitted[0]
          }).then(function (response) {*/
          //console.log(response)
          //adds color to the score
          let score=''
          /*if (that.props.props.type == 'intern') {
            if (parseInt(response.data.score) > 80) {
              score = <span style={{ color: lightGreenA700 }}>{response.data.score}</span>
            } else if (parseInt(response.data.score) > 50) {
              score = <span style={{ color: yellow800 }}>{response.data.score}</span>
            } else {
              score = <span style={{ color: red500 }}>{response.data.score}</span>
            }
            score += '% match '
          }*/
          //checks if there are undefined
          let args = {}
          if (splitted[2] != 'undefined') {
            args['leftAvatar'] = <Avatar src={splitted[2]} />
          } else {
            args['leftAvatar'] = <Avatar >{splitted[1].substring(0, 1)}</Avatar>
          }

          console.log(parseInt(i) + 1 + that.props.modNum)

          tempintern.push(
            <Paper zDepth={2} key={i} className='paper-list'>
              <ListItem
                {...args}
                {...that.state.colors[parseInt(i) + 1 + that.props.modNum]}
                primaryText={splitted[1]}
                secondaryText={<p>{score}{bio}</p>}
                secondaryTextLines={1}
                hoverColor='#F95498B0'
                onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj + that.props.modNum, splitted[0]) }}
              />
            </Paper>
          )
          /*}).catch(function (error) {
            console.log(error);
          })*/
        }
        that.setState({ interns: tempintern })
      }).catch(function (error) {
        console.log(error);
      })
    }
    if (this.props.props2.currPaper != nextProps.props2.currPaper) {
      let tempArr = []
      // console.log(props.props2.currPaper)
      tempArr[this.props.props2.currPaper] = null
      tempArr[nextProps.props2.currPaper] = { style: { backgroundColor: '#EB347F' } }
      this.setState({ colors: tempArr }, this.changeColors)
    }
  }

  componentDidMount = () => {
    let that = this
    //Gets users in chatroom
    axios.post('/GET-USERS-IN-CHATROOM', {
      "chatroomName": this.props.props.state.currChatName,
    }).then(function (response) {
      let tempintern = []
      let profileAdj = 1
      for (let i in response.data) {
        let splitted = response.data[i].split('$:$')
        if (splitted[1] == '' || splitted[1] == 'undefined') {
          continue
        }
        if (splitted[0] == that.props.props.uid) {
          profileAdj--
          that.props.changeUrl(splitted[2])
          continue
        }
        let tempProfileAdj = profileAdj
        let bio = ''
        for (let e = 3; e < splitted.length; e++) {
          if (splitted[e] != 'undefined')
            bio += splitted[e]
        }
        /*//compares current intern to the shown one
        axios.post('/COMPARE-INTERNS', {
          userID1: that.props.props.uid,
          userID2: splitted[0]
        }).then(function (response) {*/
        //console.log(response)
        //adds color to the score
        let score = ''
        /*if (that.props.props.type == 'intern') {
          if (parseInt(response.data.score) > 80) {
            score = <span style={{ color: lightGreenA700 }}>{response.data.score}</span>
          } else if (parseInt(response.data.score) > 50) {
            score = <span style={{ color: yellow800 }}>{response.data.score}</span>
          } else {
            score = <span style={{ color: red500 }}>{response.data.score}</span>
          }
          score += '% match '
        }*/
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
              {...that.state.colors[parseInt(i) + 1 + that.props.modNum]}
              primaryText={splitted[1]}
              secondaryText={<p>{score}{bio}</p>}
              secondaryTextLines={1}
              hoverColor='#F95498B0'
              onClick={() => { that.handleClick(parseInt(i) + tempProfileAdj + that.props.modNum, splitted[0]) }}
            />
          </Paper>
        )
        /*}).catch(function (error) {
          console.log(error);
        })*/
      }
      that.setState({ interns: tempintern })
    }).catch(function (error) {
      console.log(error);
    })
  }

  changeColors = () => {
    let that = this
    let tempArr = []
    for (let i in this.state.interns) {
      //console.log(this.state.interns[i])
      tempArr.push(
        <Paper zDepth={2} key={i} className='paper-list'>
          <ListItem
            leftAvatar={this.state.interns[i].props.children.props.leftAvatar}
            primaryText={this.state.interns[i].props.children.props.primaryText}
            secondaryText={this.state.interns[i].props.children.props.secondaryText}
            secondaryTextLines={1}
            onClick={this.state.interns[i].props.children.props.onClick}
            hoverColor='#F95498B0'
            {...that.state.colors[parseInt(i) + 1 + that.props.modNum]}
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

  render() {
    return (this.state.interns);
  }
}

export default GetInterns;