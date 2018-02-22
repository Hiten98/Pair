import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Login from './LoginPage/bootstrap-login.js'
import Register from './RegisterPage/Register.js'
import './WelcomeScreen.css';
import history from './history'
import NewEmployeeRegister from './EmployeeRegisterForm/NewEmployeeRegister.js'
import { Checkbox } from 'material-ui';

class WelcomeScreen extends Component {
  state = {
    uid: null,
    companyLocationList:["place1","place2","place3"],
  }

  item=[]

  updateUid = (uid) => {
    this.setState({ uid })
  }

  updateCompanyLocations=(companyLocationList)=>{
    this.setState({companyLocationList})
  }

  getCompanyLocations=()=>{
    return this.state.companyLocationList;
  }

  render() {
    return (
      <div>
        <div className="mainBox">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/login' />} />
            <Route exact path='/login' render={() => <Login updateUid={this.updateUid.bind(this)} />} />
            <Route exact path='/register' render={() => <Register updateUid={this.updateUid.bind(this)} updateCompanyLocations={this.updateCompanyLocations.bind(this)}/>} />
            <Route path='/register/account' render={() => <NewEmployeeRegister companyLocationList={this.getCompanyLocations.bind(this)} item={this.item}/>} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;