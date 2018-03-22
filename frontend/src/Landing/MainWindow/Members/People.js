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
    this.state = {
      mods: [],
      interns: [],
      myURL: '',
      temp: false,
      props: {},
    }
  }

  handleClick = (i, uid) => {
    //TODO: do what i did in the sidebar
    this.props.changeSelected(uid)
  }

  changeUrl=(url)=>{
    this.setState({myURL:url})
  }

  componentDidMount = () => {
    
  }

  render() {
    let args = {}
    if (this.state.myURL != 'undefined' && this.state.myURL != '') {
      args['leftAvatar'] = <Avatar src={this.state.myURL} />
    } else {
      args['leftAvatar'] = <Avatar src={PersonIcon}></Avatar>
    }
    let toSend={
      props:this.props.props,
      changeUrl:this.changeUrl,
    }
    //console.log(this.state.interns)
    return (
      <Col xs={4} className='list-column'>
        <List>
          <Paper zDepth={2} className='paper-list'>
            <ListItem
              {...args}
              primaryText='My Profile'
              onClick={() => { this.handleClick(0, this.props.props.uid) }}
            />
          </Paper>
          <GetMods {...toSend}/>
          <GetInterns {...toSend}/>
        </List>
      </Col>
    );
  }
}

export default People;