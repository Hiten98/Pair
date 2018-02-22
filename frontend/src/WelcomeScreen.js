import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Login from './LoginPage/bootstrap-login.js'
import Register from './RegisterPage/Register.js'
import './WelcomeScreen.css';
import history from './history'
import NewEmployeeRegister from './EmployeeRegisterForm/NewEmployeeRegister.js'
import { Checkbox } from 'material-ui';
import InternRegPart1 from './InternRegister/InternRegPart1'

class WelcomeScreen extends Component {
  state = {
    uid: null,
    companyLocationList: [],
    moderator:false,
  }

  item = []

  updateUid = (uid) => {
    this.setState({ uid })
    if(uid.charAt(3)==1)
      this.setState({moderator:true})
  }

  updateCompanyLocations = (companyLocationList) => {
    this.setState({ companyLocationList })
  }

  getCompanyLocations = () => {
    return this.state.companyLocationList;
  }

  componentDidMount() {
    if (this.item.length == 0) {
      let i = 0
      for (let a of this.getCompanyLocations()) {
        this.item.push(<Checkbox label={a} key={i} value={a} onCheck={this.handleCheck} />)
        i++
      }
    }
  }

  render() {
    return (
      <div>
        <div className="mainBox">
          <Switch>
            <Route exact path='/' render={() => <Redirect to='/login' />} />
            <Route exact path='/login' render={() => <Login updateUid={this.updateUid.bind(this)} />} />
            <Route exact path='/register' render={() => <Register updateUid={this.updateUid.bind(this)} updateCompanyLocations={this.updateCompanyLocations.bind(this)} />} />
            <Route path='/register/employee' render={() => <NewEmployeeRegister companyLocationList={this.getCompanyLocations.bind(this)} item={this.item} />} />
            <Route path='/register/intern/part1' render={()=><InternRegPart1 uid={history.location.pathname.substring(history.location.pathname.lastIndexOf('/')+1)} updateUid={this.updateUid.bind(this)}/>}/>
          </Switch>
        </div>
      </div>
    );
  }
}

export default WelcomeScreen;