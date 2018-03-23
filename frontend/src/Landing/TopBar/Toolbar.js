import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import Menu from './Menu'
import './Toolbar.css';
import { RaisedButton, Tabs, Tab } from 'material-ui';
import history from '../../history';

class Toolbar extends Component {
  constructor(props) {
    super(props)
    let currPage = 0
    if (!history.location.pathname.indexOf(`/landing/${props.type}/members`)) {
      currPage = 1
    }
    this.state = {
      currPage: currPage,
    }
  }

  changeToChat = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/chat`))
      history.push(`/landing/${this.props.type}/chat`)
  }

  changeToMembers = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/members`))
      history.push(`/landing/${this.props.type}/members`)
  }

  changeToSaved = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/saved`))
      history.push(`/landing/${this.props.type}/saved`)
  }

  changeToHouse = () => {
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/housing`))
      history.push(`/landing/${this.props.type}/housing`)
  }

  ifIntern = () => {
    if (this.props.type == 'intern') {
      return (
        <Tabs
          style={{ width: '90%' }}
          initialSelectedIndex={this.state.currPage}
        >
          <Tab
            label="Chat"
            onActive={this.changeToChat}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
          <Tab
            label='Members'
            onActive={this.changeToMembers}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
          <Tab
            label="Saved Houses"
            onActive={this.changeToSaved}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
          <Tab
            label='Housing'
            onActive={this.changeToHouse}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
        </Tabs>
      )
    } else if (this.props.type == 'employee') {
      return (
        <Tabs
          style={{ width: '90%' }}
          initialSelectedIndex={this.state.currPage}
        >
          <Tab
            label="Chat"
            onActive={this.changeToChat}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
          <Tab
            label='Members'
            onActive={this.changeToMembers}
            buttonStyle={{ backgroundColor: '#50C2C4', }}
          ></Tab>
        </Tabs>
      )
    }
  }

  render() {
    return (
      <div>
        <Row className="tool-bar">
          {this.ifIntern()}
          <div className='hamburger-menu'>
            <Menu uid={this.props.uid} type={this.props.type} />
          </div>
        </Row>
      </div>
    );
  }
}

export default Toolbar;