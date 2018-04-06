import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import MenuTop from './Menu'
import './Toolbar.css';
import { RaisedButton, Tabs, Tab, Toolbar, ToolbarGroup, DropDownMenu, MenuItem, IconMenu, IconButton, AppBar, Drawer, Menu, Paper, ListItem } from 'material-ui';
import history from '../../history';

class TopBar extends Component {
  constructor(props) {
    super(props)
    let a = []
    let currPage = 'chat'
    if (!history.location.pathname.indexOf(`/landing/${props.type}/members`)) {
      currPage = 'members'
    } else if (!history.location.pathname.indexOf(`/landing/${props.type}/complaints`)) {
      currPage = 'complaints'
    } else if (!history.location.pathname.indexOf(`/landing/${props.type}/companies`)) {
      currPage = 'companies'
    } else if (!history.location.pathname.indexOf(`/landing/${props.type}/saved`)) {
      currPage = 'saved'
    } else if (!history.location.pathname.indexOf(`/landing/${props.type}/housing`)) {
      currPage = 'housing'
    }
    a[currPage] = { style: { backgroundColor: '#EB347F', color: 'white', fontSize: '21px', height: '8vh' } }
    this.state = {
      value: currPage,
      navDrawer: false,
      colors: a,
    }
    // console.log(props)
  }

  createTab = (title, value) => {
    return (
      <ListItem
        primaryText={title}
        onClick={() => { this.handleChange(null, null, value) }}
        hoverColor='#F95498B0'
        style={{ color: 'white', fontSize: '21px', height: '8vh' }}
        {...this.state.colors[value]}
      />
    )
  }

  handleChange = (ev, key, value) => {
    // console.log(ev)
    let a = []
    a[value] = { style: { backgroundColor: '#EB347F', color: 'white', fontSize: '21px', height: '8vh' } }
    this.setState({ value: value, colors: a })
    this.props.changeNeedToUpdate()
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/${value}`))
      history.push(`/landing/${this.props.type}/${value}`)
  }

  handleMobileChange = (ev, value) => {
    // console.log(ev)
    this.setState({ value: value, navDrawer: false })
    if (history.location.pathname.indexOf(`/landing/${this.props.type}/${value}`))
      history.push(`/landing/${this.props.type}/${value}`)
  }

  returnDesktop = () => {
    return (
      <Row className="tool-bar">
        <Toolbar style={{ height: "8vh", backgroundColor: "#50C2C4", }}>
          <ToolbarGroup>
            {(this.props.type == "employee" || this.props.type == "intern") ? this.createTab("Chat", "chat") : <div></div>}
            {(this.props.type == "employee" || this.props.type == "intern") ? this.createTab("Members", "members") : <div></div>}
            {(this.props.type == "intern") ? this.createTab("Housing", "housing") : <div></div>}
            {(this.props.type == "intern") ? this.createTab("Saved Houses", "saved") : <div></div>}
            {(this.props.type == "admin" || this.props.type == "employee") ? this.createTab("Complaints", "complaints") : <div></div>}
            {(this.props.type == "admin") ? this.createTab("Companies", "companies") : <div></div>}
          </ToolbarGroup>
          <MenuTop {...this.props} />
        </Toolbar>
      </Row >
    )
  }

  returnMobile = () => {
    // console.log(this.props.type)
    return (
      <Row className='tool-bar'>
        <AppBar
          style={{ height: "8vh", backgroundColor: "#50C2C4", }}
          iconClassNameRight='material-icons md-light md-36'
          title={<span>{this.state.value.charAt(0).toUpperCase() + this.state.value.substr(1)}<i className="material-icons">&#xE313;</i></span>}
          onTitleClick={() => { this.setState({ navDrawer: true }) }}
          onLeftIconButtonClick={this.props.changeDrawerStatus}
        />
        <Drawer
          open={this.state.navDrawer}
          docked={false}
          disableSwipeToOpen
          openSecondary
          onRequestChange={() => { this.setState({ navDrawer: false }) }}
        >
          <Menu
            onChange={this.handleMobileChange}
            value={this.state.value}
          >
            {(this.props.type == "employee" || this.props.type == "intern") ? <MenuItem value="chat" primaryText="Chat" /> : <div></div>}
            {(this.props.type == "employee" || this.props.type == "intern") ? <MenuItem value="members" primaryText="Members" /> : <div></div>}
            {(this.props.type == "intern") ? <MenuItem value="housing" primaryText="Housing" /> : <div></div>}
            {(this.props.type == "intern") ? <MenuItem value="saved" primaryText="Saved Houses" /> : <div></div>}
            {(this.props.type == "admin" || this.props.type == 'employee') ? <MenuItem value="complaints" primaryText="Complaints" /> : <div></div>}
            {(this.props.type == "admin") ? <MenuItem value="companies" primaryText="Companies" /> : <div></div>}
          </Menu>
        </Drawer>
      </Row>
    )
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

export default TopBar;