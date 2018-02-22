import React, { Component } from 'react';
import {NavLink, Switch, Route, Redirect} from 'react-router-dom'
import Login from './bootstrap-login.js'
import Register from './Register.js'
import './WelcomeScreen.css';
import history from './history'
import NewEmployeeRegister from './NewEmployeeRegister'

class WelcomeScreen extends Component {
  state={
    uid:null,
  }

  updateUid=(uid)=>{
    this.setState({uid})
  }

  constructor(){
    super()
    history.push('/')
  }

  render() {
    return (
      <div>
        <div className="mainBox">
          <Switch>
            <Route exact path='/' render={()=><Redirect to='/login'/>}/>
            <Route exact path='/login' component={Login} updateUid={this.updateUid}/>
            <Route exact path='/register' component={Register} updateUid={this.updateUid}/>
            <Route path='/register/account' component={NewEmployeeRegister}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;