import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import bars from '../../images/bars.svg'
import history from '../../history'
import ChangePasswordModal from './ChangePasswordModal'
import DeleteAccountModal from './DeleteAccountModal'
// import './Menu.css';

class Menu extends Component {
  constructor(props){
    super(props)
    this.state={
      deleteOpen:false,
      passOpen:false,
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

  goToProfile=()=>{
    history.push(`/landing/${this.props.type}/members/0`)
  }

  deleteAccount=()=>{
    this.setState({deleteOpen:!this.state.deleteOpen})
  }

  changePass=()=>{
    this.setState({passOpen:!this.state.passOpen})
  }

  render() {
    return (
      <div>
        <IconMenu
          iconButtonElement={<IconButton><img src={bars} alt='hamburger menu' /></IconButton>}
          style={{ position: 'absolute', right: '1vw' }}
        >
          <MenuItem onClick={this.goToProfile} primaryText='Profile' />
          <MenuItem onClick={this.changePass} primaryText='Change Password' />
          <MenuItem onClick={this.deleteAccount} primaryText='Delete account'/>
          <MenuItem onClick={this.signOut} primaryText='Sign Out' />
        </IconMenu>
        <DeleteAccountModal deleteOpen={this.state.deleteOpen} deleteAccount={this.deleteAccount} uid={this.props.uid}/>
        <ChangePasswordModal passOpen={this.state.passOpen} changePass={this.changePass} uid={this.props.uid}/>
      </div>
    );
  }
}

export default Menu;