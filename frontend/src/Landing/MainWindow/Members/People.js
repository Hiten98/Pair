import React, { Component } from 'react';
import { Paper, ListItem, Avatar, List } from 'material-ui'
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col } from 'react-bootstrap'
import axios from 'axios'
import './People.css';
import PersonIcon from '../../../images/account.svg'
import GetInterns from './GetInterns'
import GetMods from './GetMods'

class People extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    // console.log(props.props2.currPaper)
    tempArr[props.currPaper] = { style: { backgroundColor: '#EB347F' } }
    this.state = {
      modNum: 0,
      colors: tempArr,
      myProfile: [],
      myURL:'',
    }
  }

  handleClick = (i, id) => {
    let tempArr = this.state.colors
    tempArr[this.props.currPaper] = null
    tempArr[i] = { style: { backgroundColor: '#EB347F' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.changeSelected(id, i)
  }

  changeColors = () => {
    let that = this
    let tempArr = []
    //console.log(this.state.myProfile)
    tempArr.push(
      <Paper zDepth={2} key={0} className='paper-list'>
        <ListItem
          leftAvatar={this.state.myProfile[0].props.children.props.leftAvatar}
          primaryText={this.state.myProfile[0].props.children.props.primaryText}
          onClick={this.state.myProfile[0].props.children.props.onClick}
          hoverColor='#F95498B0'
          {...that.state.colors[0]}
        />
      </Paper>
    )
    this.setState({ myProfile: tempArr })
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currPaper != nextProps.currPaper) {
      let tempArr = []
      // console.log(props.props2.currPaper)
      tempArr[this.props.currPaper] = null
      tempArr[nextProps.currPaper] = { style: { backgroundColor: '#EB347F' } }
      this.setState({ colors: tempArr }, this.changeColors)
    }
  }

  changeUrl = (url) => {
    this.setState({ myURL: url },this.componentDidMount)
  }

  changeModNum = (num) => {
    this.setState({ modNum: num })
  }

  componentDidMount = () => {
    let args = {}
    if (this.state.myURL != 'undefined' && this.state.myURL != '') {
      args['leftAvatar'] = <Avatar src={this.state.myURL} />
    } else {
      args['leftAvatar'] = <Avatar src={PersonIcon}></Avatar>
    }
    let tempArr = []
    tempArr.push(
      <Paper zDepth={2} key={0} className='paper-list'>
        <ListItem
          {...args}
          hoverColor='#F95498B0'
          primaryText='My Profile'
          onClick={() => { this.handleClick(0, this.props.props.uid) }}
          {...this.state.colors[0]}
        />
      </Paper>
    )
    this.setState({ myProfile: tempArr })
  }

  render() {

    let toSend = {
      props: this.props.props,
      changeUrl: this.changeUrl,
      changeModNum: this.changeModNum,
      modNum: this.state.modNum,
      props2: this.props,
    }
    //console.log(this.state.interns)
    return (
      <Col xs={4} className='list-column'>
        <List>
          {this.state.myProfile}
          <GetMods {...toSend} />
          <GetInterns {...toSend} />
        </List>
      </Col>
    );
  }
}

export default People;