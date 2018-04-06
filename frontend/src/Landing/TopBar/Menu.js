import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { IconMenu, MenuItem, IconButton, ToolbarGroup } from 'material-ui'
import bars from '../../images/bars.png'
import history from '../../history'
import ChangePasswordModal from './ChangePasswordModal'
import DeleteAccountModal from './DeleteAccountModal'
import './Toolbar.css';

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOpen: false,
      passOpen: false,
    }
  }

  signOut = () => {
    try {
      localStorage.removeItem('app')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    history.go(0)
  }

  goToProfile = () => {
    history.push(`/landing/${this.props.type}/members`)
  }

  deleteAccount = () => {
    this.setState({ deleteOpen: !this.state.deleteOpen })
  }

  changePass = () => {
    this.setState({ passOpen: !this.state.passOpen })
  }

  render() {
    return (
      <ToolbarGroup>
        <DeleteAccountModal deleteOpen={this.state.deleteOpen} deleteAccount={this.deleteAccount} uid={this.props.uid} />
        <ChangePasswordModal passOpen={this.state.passOpen} changePass={this.changePass} uid={this.props.uid} />
        <IconMenu
          iconButtonElement={<IconButton><i className="material-icons md-light md-36">&#xE8FE;</i></IconButton>}
          onChange={this.handleMenu}
        >
          {(this.props.type != "admin" && this.props.type != "company") ? <div><MenuItem onClick={this.goToProfile} primaryText='Profile' />
            <MenuItem onClick={this.changePass} primaryText='Change Password' />
            <MenuItem onClick={this.deleteAccount} primaryText='Delete account' /></div> : <div></div>}
          <MenuItem onClick={this.signOut} primaryText='Sign Out' />
        </IconMenu>

      </ToolbarGroup>
    );
  }
}

export default Menu;