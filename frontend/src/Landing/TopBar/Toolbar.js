import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Menu from './Menu'
import './Toolbar.css';
import { RaisedButton } from 'material-ui';
import history from '../../history';

class Toolbar extends Component {
  changeToChat = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/chat`))
      history.push(`/landing/${this.props.type}/chat`)
  }

  changeToMembers = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/members`))
      history.push(`/landing/${this.props.type}/members`)
  }

  render() {
    return (
      <div>
        <Row className="tool-bar">
          <RaisedButton
            label='Chats'
            onClick={this.changeToChat}
          />
          <RaisedButton
            label='Members'
            onClick={this.changeToMembers}
          />
          <Menu uid={this.props.uid} type={this.props.type} />
        </Row>
      </div>
    );
  }
}

export default Toolbar;