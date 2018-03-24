import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui';
//import './ProfileHeader.css';

class ProfileHeader extends Component {
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
    return (
      <Row className='row-div'>
        {this.privateChatButton()}
      </Row>
    )
  }

  internButtons = () => {
    return (
      <Row className='row-div'>
        {this.privateChatButton()}
      </Row>
    )
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
      </Row>
    );
  }
}

export default ProfileHeader;