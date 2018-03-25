import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui';
import RemoveInternModal from './RemoveInternModal'
import PrivateChatModal from './PrivateChatModal'
import GroupChatModal from './GroupChatModal'
import axios from 'axios'
import history from '../../../history';
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

  editProfile = () => {
    console.log(this.props)
    if (this.props.props.type == 'employee')
      history.push('register/employee/edit-profile')
    else if (this.props.props.type == 'intern')
      history.push('register/intern/preferences/user-details')
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
            {(this.props.uid == this.props.currProfile) ? <RaisedButton secondary label="Edit Profile" onClick={this.editProfile} /> : <div></div>}
          </Row>
          {(this.props.props.type == 'employee') ? this.empButtons() : (this.props.props.type == 'intern') ? this.internButtons() : <div></div>}
        </Col>
        <PrivateChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <GroupChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <RemoveInternModal {...this.state} {...this.props} closeAll={this.closeAll} />
      </Row>
    );
  }
}

export default ProfileHeader;