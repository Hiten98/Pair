import React, { Component } from 'react';
import { Paper, ListItem, Avatar, List, Drawer } from 'material-ui'
import { Col } from 'react-bootstrap'
import './People.css';
import PersonIcon from '../../../../images/account.svg'
import GetInterns from './GetInterns'
import GetMods from './GetMods'

class People extends Component {
  constructor(props) {
    super(props)
    let tempArr = []
    // console.log(props.props2.currPaper)
    tempArr[props.currPaper] = { style: { backgroundColor: 'var(--color2)' } }
    this.state = {
      modNum: 0,
      colors: tempArr,
      myProfile: [],
      myURL: '',
      personDrawer: false,
    }
  }

  handleClick = (i, id) => {
    let tempArr = this.state.colors
    tempArr[this.props.currPaper] = null
    tempArr[i] = { style: { backgroundColor: 'var(--color2)' } }
    this.setState({ colors: tempArr }, this.changeColors)
    this.props.changeSelected(id, i)
    this.changeNavDrawer()
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
          // hoverColor='#F95498B0'
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
      tempArr[nextProps.currPaper] = { style: { backgroundColor: 'var(--color2)' } }
      this.setState({ colors: tempArr }, this.changeColors)
    }
    if (this.props.props.state.currChatName != nextProps.props.state.currChatName) {
      this.changeNavDrawer()
      this.handleClick(0, this.props.props.uid)
    }
  }

  changeUrl = (url) => {
    this.setState({ myURL: url }, this.componentDidMount)
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
      <Paper zDepth={2} key={0} className='paper-list' style={{ position: 'sticky' }}>
        <ListItem
          {...args}
          // hoverColor='#F95498B0'
          primaryText='My Profile'
          onClick={() => { this.handleClick(0, this.props.props.uid) }}
          {...this.state.colors[0]}
        />
      </Paper>
    )
    // console.log(this.props.props.uid)
    this.setState({ myProfile: tempArr })
  }

  changeNavDrawer = () => {
    this.setState({ personDrawer: !this.state.personDrawer })
  }

  returnDesktop() {
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

  returnMobile = () => {
    let toSend = {
      props: this.props.props,
      changeUrl: this.changeUrl,
      changeModNum: this.changeModNum,
      modNum: this.state.modNum,
      props2: this.props,
      changeNavDrawer: this.changeNavDrawer,
    }
    //console.log(this.state.interns)
    return (
      <div>
        <Drawer
          open={this.state.personDrawer}
          docked={false}
          disableSwipeToOpen
          openSecondary
          onRequestChange={() => { this.setState({ personDrawer: false }) }}
        >
          <List>
            {this.state.myProfile}
            <GetMods {...toSend} />
            <GetInterns {...toSend} />
          </List>
        </Drawer>
        <ListItem
          primaryText="Change Person"
          onClick={() => { this.setState({ personDrawer: true }) }}
          style={{ position: 'absolute', bottom: '0vh', backgroundColor:'var(--color3)', color:'var(--color1)', width:'100%' }}
        />
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 768) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default People;