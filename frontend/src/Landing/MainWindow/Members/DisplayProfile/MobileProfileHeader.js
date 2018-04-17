import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui';
import RemoveInternModal from './RemoveInternModal'
import PrivateChatModal from './PrivateChatModal'
import GroupChatModal from './GroupChatModal'
import ReportIntern from './ReportIntern'
import axios from 'axios'
import history from '../../../../history';
import RemoveInternGroup from './RemoveInternGroup';
import BlockUser from './BlockUser';
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
        <Row>
          <img src={this.props.pic} className='profile-img mobile' alt={`${this.props.firstname}'s Profile Picture`} />
        </Row>
      )
    } else
      return null
  }

  empButtons = () => {
    if (this.props.uid != this.props.currProfile && this.props.props.type == 'employee') {
      return (
        <div>
          <Row style={{ marginBottom: '18px' }}>
            {this.privateChatButton()}
          </Row>
          {(this.props.currProfile.charAt(0) == 1) ? this.modSettings() : null}
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
          <Row style={{ marginBottom: '18px' }}>
            {(this.props.ban) ?
              <RaisedButton
                label='Unban'
                onClick={this.unban}
                secondary
                className='link'
                style={{ float: 'left' }}
              /> :
              <RaisedButton
                label='ban'
                onClick={this.ban}
                secondary
                className='link'
                style={{ float: 'left' }}
              />
            }
          </Row>
          <Row style={{ marginBottom: '18px' }}>
            <RaisedButton
              label='Remove Intern from company'
              onClick={this.removeIntern}
              secondary
              className='link'
              style={{ float: 'left' }}
            />
          </Row>
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
    if (this.props.uid != this.props.currProfile && this.props.props.type == 'intern') {
      return (
        <Row className='row-div'>
          {this.privateChatButton()}
          {(this.props.currProfile.substring(0, 1) == 1) ? <RaisedButton
            label='Add to Group Chat'
            onClick={this.groupChat}
            secondary
            className='link'
            style={{ float: 'left' }}
          /> : null}
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
          style={{ float: 'left' }}
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
      history.push('/register/intern/edit-profile/user-details')
  }

  secondLine = () => {
    let thing = []
    if (this.props.uid == this.props.currProfile) {
      thing.push(
        <RaisedButton
          secondary
          label="Edit Profile"
          onClick={this.editProfile}
          className='links'
          key={1}
          style={{ float: 'left' }}
        />
      )
    }

    //check to see if the profile is another intern's and if it is then add the block items
    if (this.props.uid !== this.props.currProfile && this.props.currProfile.charAt(0) === 1)
      thing.push(<BlockUser {...this.props} key='block' />)

    thing.push(<ReportIntern {...this.props}{...this.state} key='report' />)
    if (this.props.props.state.currChatName.charAt(0) == 3 && this.props.currProfile != this.props.uid) {
      thing.push(
        <RaisedButton
          label='Remove from Group Chat'
          onClick={this.leaveChat}
          secondary
          style={{ float: 'left' }}
          key='3'
        />
      )
    }
    return thing
  }

  render() {
    return (
      <div>
        {this.displayPic()}
        <Row>
          <span style={{ fontSize: '60px' }}>{`${this.props.firstname} ${this.props.lastname}`}</span>
        </Row>
        {(this.props.props.type == 'intern') ? <Row>{this.props.match}</Row> : null}
        <Row>
          {this.secondLine()}
        </Row>
        {this.empButtons()}
        {this.internButtons()}
        {this.props.props.type == 'employee' && this.props.currProfile != this.props.uid ?
          <Row>
            Start Date: {this.props.startDate}&nbsp;&nbsp;&nbsp;
            End Date: {this.props.endDate}
          </Row>
          : null}
        <PrivateChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <GroupChatModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <RemoveInternModal {...this.state} {...this.props} closeAll={this.closeAll} />
        <RemoveInternGroup {...this.props} {...this.state} closeAll={this.closeAll} />
      </div>
    )
  }
}

export default ProfileHeader;