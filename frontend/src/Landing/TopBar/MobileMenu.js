import React, { Component } from 'react';
import { MenuItem } from 'material-ui'
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
      localStorage.removeItem('pair-app')
    } catch (err) {
      //console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
    history.go(0)
  }

  goToProfile = () => {
    this.props.closeDrawer(null, 'members')
    history.push(`/landing/${this.props.type}/members`)
  }

  deleteAccount = () => {
    this.props.closeDrawer(null, null)
    this.setState({ deleteOpen: !this.state.deleteOpen })
  }

  changePass = () => {
    this.props.closeDrawer(null, null)
    this.setState({ passOpen: !this.state.passOpen })
  }

  render() {
    return (
      <div style={{ fontSize: '150%', textAlign: 'left' }}>
        <DeleteAccountModal deleteOpen={this.state.deleteOpen} deleteAccount={this.deleteAccount} uid={this.props.uid} />
        <ChangePasswordModal passOpen={this.state.passOpen} changePass={this.changePass} uid={this.props.uid} />
        {(this.props.type != "admin" && this.props.type != "company") ? <MenuItem onClick={this.goToProfile} value="" primaryText='Profile' /> : null}
        {(this.props.type != "admin" && this.props.type != "company") ? <MenuItem onClick={this.changePass} value="" primaryText='Change Password' /> : null}
        {(this.props.type != "admin" && this.props.type != "company") ? <MenuItem onClick={this.deleteAccount} value="" primaryText='Delete account' /> : null}
        <MenuItem onClick={this.signOut} value="" primaryText='Sign Out' />
      </div>
    );
  }
}

export default Menu;