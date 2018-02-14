import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import Login from './bootstrap-login.js'
import Register from './Register.js'
import './WelcomeScreen.css';

class WelcomeScreen extends Component {
  render() {
    return (
      <div>
        <div className="mainBox">
          <Switch>
            <Route path='/' component={Login}/>
            <Route path='/register' component={Register}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;