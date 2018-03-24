import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui';
import RemoveInternModal from './RemoveInternModal'
import PrivateChatModal from './PrivateChatModal'
import GroupChatModal from './GroupChatModal'
import axios from 'axios'
//import './ProfileHeader.css';

class ProfileHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ban: props.ban,
      privateOpen: false,
      groupOpen: false,
      removeOpen: false,
    }
    console.log(props)
  }

  displayPic = () => {
    if (this.props.pic != null) {
      return (
        <Col xs={4}>
          <img src={this.props.pic} alt={`${this.props.firstname}'s Profile Picture`} />
        </Col>
      )
    } else
      return null
  }

  empButtons = () => {
    if (this.props.uid != this.props.currProfile) {
      return (
        <div>
          <div style={{marginLeft:'-14px'}}>
            {this.privateChatButton()}
          </div>
          <Row className='row-div'>
            {this.modSettings()}
          </Row>
        </div>
      )
    }
  }

  modSettings = () => {
    if (this.props.currProfile.substring(0, 1) == 1) {
      return (
        <div>
          {(this.props.ban) ?
            <RaisedButton
              label='Unban'
              onClick={this.unban}
              secondary
              className='link'
            /> :
            <RaisedButton
              label='ban'
              onClick={this.ban}
              secondary
              className='link'
            />
          }
          <RaisedButton
            label='Remove Intern from company'
            onClick={this.removeIntern}
            secondary
            className='link'
          />
        </div>
      )
    }
  }

  ban=()=>{
    let that=this
    axios.post("/BAN-INTERN", {
      "userID": this.props.currProfile
    }).then(function (response) {
      if(response.data.status){
        that.setState({ban:true})
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  internButtons = () => {
    if (this.props.uid != this.props.currProfile) {
      return (
        <Row className='row-div'>
          {this.privateChatButton()}
          <RaisedButton
            label='Add to Group Chat'
            onClick={this.groupChat}
            secondary
            className='link'
          />
        </Row>
      )
    }
  }

  privateChatButton = () => {
    if (this.props.uid != this.props.currProfile) {
      return (
        <RaisedButton
          secondary
          label='Create Private Chat'
          onClick={this.privateChat}
          className='link'
        />
      )
    }
  }

  privateChat = () => {
    this.setState({ privateOpen: true })
  }

  groupChat = () => {
    this.setState({ groupOpen: true })
  }

  removeIntern = () => {
    this.setState({ removeOpen: true })
  }

  closeAll = () => {
    this.setState({ privateOpen: false, groupOpen: false, removeOpen: false })
  }

  render() {
    return (
      <Row>
        {this.displayPic()}
        <Col xs={8}>
          <Row>
            <span style={{ fontSize: '60px' }}>{`${this.props.firstname} ${this.props.lastname}`}</span>
          </Row>
          <Row>
            {(this.props.props.type == 'intern') ? this.props.match : <div></div>}
          </Row>
          {(this.props.props.type == 'employee') ? this.empButtons() : (this.props.props.type == 'intern') ? this.internButtons() : <div></div>}
        </Col>
        <PrivateChatModal {...this.state} {...this.props} />
        <GroupChatModal {...this.state} {...this.props} />
        <RemoveInternModal {...this.state} {...this.props} />
      </Row>
    );
  }
}

export default ProfileHeader;