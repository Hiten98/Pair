import React, { Component } from 'react';
import { IconMenu, MenuItem, IconButton, ToolbarGroup, FlatButton } from 'material-ui'
import history from '../../history'
import ChangePasswordModal from './ChangePasswordModal'
import DeleteAccountModal from './DeleteAccountModal'
import Notifications from './Notifications'
import './Toolbar.css';

class Menu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      deleteOpen: false,
      passOpen: false,
      notificationVisible: false,
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
    history.push(`/landing/${this.props.type}/members`)
  }

  deleteAccount = () => {
    this.setState({ deleteOpen: !this.state.deleteOpen })
  }

  changePass = () => {
    this.setState({ passOpen: !this.state.passOpen })
  }

  closeNotifications = () => {
    this.setState({ notificationVisible: false })
  }

  render() {
    return (
      <ToolbarGroup>
        {this.props.type == 'intern' ? <FlatButton
          onClick={(event) => {
            this.setState({
              anchorEl: event.currentTarget,
              notificationVisible: true,
            });
          }}
          icon={<i className="material-icons md-light md-36">&#xE7F4;</i>}
        /> : null}
        <Notifications {...this.props} anchorEl={this.state.anchorEl} notificationVisible={this.state.notificationVisible} closeNotifications={this.closeNotifications} />

        <DeleteAccountModal deleteOpen={this.state.deleteOpen} deleteAccount={this.deleteAccount} uid={this.props.uid} />
        <ChangePasswordModal passOpen={this.state.passOpen} changePass={this.changePass} uid={this.props.uid} />
        <IconMenu
          iconButtonElement={<IconButton><i className="material-icons md-light md-36">&#xE8FE;</i></IconButton>}
          onChange={this.handleMenu}
          style={{ marginLeft: '20px' }}
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
