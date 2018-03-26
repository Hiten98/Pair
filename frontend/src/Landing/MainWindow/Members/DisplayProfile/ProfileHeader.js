import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui';
import RemoveInternModal from './RemoveInternModal'
import PrivateChatModal from './PrivateChatModal'
import GroupChatModal from './GroupChatModal'
import ReportIntern from './ReportIntern'
import axios from 'axios'
import history from '../../../../history';
import RemoveInternGroup from './RemoveInternGroup';
//import './ProfileHeader.css';

class ProfileHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ban: props.ban,
      privateOpen: false,
      groupOpen: false,
      removeOpen: false,
      leaveOpen: false,
    }
  }

  displayPic = () => {
    if (this.props.pic != null && this.props.pic != 'undefined') {
      return (
        <Col xs={4}>
          <img src={this.props.pic} className='profile-img' alt={`${this.props.firstname}'s Profile Picture`} />
        </Col>
      )
    } else
      return null
  }

  empButtons = () => {
    if (this.props.uid != this.props.currProfile) {
      return (
        <div>
          <div style={{ marginLeft: '-14px' }}>
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
    // console.log(this.props.currProfile)
    if (this.props.currProfile.substring(0, 1) == 1) {
      // console.log(this.props.ban)
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

  ban = () => {
    let that = this
    axios.post("/BAN-INTERN", {
      "userID": this.props.currProfile
    }).then(function (response) {
      if (response.data.status) {
        that.props.updateProfile()
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  unban = () => {
    let that = this
    axios.post("/UNBAN-INTERN", {
      "userID": this.props.currProfile
    }).then(function (response) {
      if (response.data.status) {
        that.props.updateProfile()
        that.setState({ ban: that.props.ban })
      }
    }).catch(function (error) {
      console.log(error);
    })
  }

  internButtons = () => {
    // console.log(this.props)
    if (this.props.uid != this.props.currProfile) {
      return (
        <Row className='row-div'>
          <Col xs={5} style={{ textAlign: 'left', marginLeft: '-2%' }}>
            {this.privateChatButton()}
          </Col>
          <Col xs={7} style={{ textAlign: 'left' }}>
            {(this.props.currProfile.substring(0, 1) == 1) ? <RaisedButton
              label='Add to Group Chat'
              onClick={this.groupChat}
              secondary
              className='link'
            /> : <div></div>}
          </Col>
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

  leaveChat = () => {
    this.setState({ leaveOpen: true })
  }

  closeAll = () => {
    this.setState({ privateOpen: false, groupOpen: false, removeOpen: false, leaveOpen: false })
  }

  editProfile = () => {
    // console.log(this.props)
    if (this.props.props.type == 'employee')
      history.push('/register/employee/edit-profile')
    else if (this.props.props.type == 'intern')
      history.push('/register/intern/preferences/user-details')
  }

  secondLine = () => {
    let amt = 0
    let thing = []
    if (this.props.uid == this.props.currProfile) {
      amt += 4
      thing.push(
        <Col xs={4}>
          <RaisedButton secondary label="Edit Profile" onClick={this.editProfile} className='links' />
        </Col>
      )
    }
    thing.push(<ReportIntern {...this.props}{...this.state} />)
    if (this.props.currProfile != this.props.uid && this.props.props.type == 'intern' && this.props.currProfile.substring(0, 1) != 2) {
      amt += 2
    }
    if (this.props.props.state.currChatName.charAt(0) == 3 && this.props.currProfile != this.props.uid) {
      amt += 6
      thing.push(
        <Col xs={6} style={{ textAlign: 'right' }}>
          <RaisedButton
            label='Remove from Group Chat'
            onClick={this.leaveChat}
            secondary
          />
        </Col>
      )
    }

    if (amt < 12) {
      thing.push(<Col xs={12 - amt}></Col>)
    }
    return thing
  }

  render() {
    return (
      <Row>
        {this.displayPic()}
        <Col xs={8}>
          <Row>
            <span style={{ fontSize: '60px' }}>{`${this.props.firstname} ${this.props.lastname}`}</span>
          </Row>
          {(this.props.props.type == 'intern') ?
            <Row style={{ marginLeft: '-1.8vw' }}>
              <Col xs={4}>{this.props.match}</Col>
            </Row> : <div></div>
          }
          <Row style={{ marginLeft: '-1.8vw',marginTop:'10px' }}>
            {this.secondLine()}
          </Row>
          {(this.props.props.type == 'employee') ? this.empButtons() : (this.props.props.type == 'intern') ? this.internButtons() : <div></div>}
        </Col>
        <PrivateChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <GroupChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <RemoveInternModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <RemoveInternGroup {...this.props} {...this.state} closeAll={this.closeAll} />
      </Row>
    );
  }
}

export default ProfileHeader;