import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { IconMenu, MenuItem, IconButton } from 'material-ui'
import bars from '../../images/bars.svg'
import history from '../../history'
import { resolve } from 'url';
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
    console.log('need to add this')
  }

  deleteAccount=()=>{
    this.setState({deleteOpen:true})
  }

  changePass=()=>{
    this.setState({passOpen:true})
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
      </div>
    );
  }
}

export default Menu;