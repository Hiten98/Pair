import React, { Component } from 'react';
import { NavLink, Switch, Route, Redirect } from 'react-router-dom'
import Login from './LoginPage/bootstrap-login.js'
import Register from './RegisterPage/Register.js'
import './WelcomeScreen.css';
import history from './history'
import NewEmployeeRegister from './EmployeeRegisterForm/NewEmployeeRegister.js'
import { Checkbox } from 'material-ui';
import InternRegPart1 from './InternRegister/InternRegPart1'
import UserDetails from './InternRegister/DetailsP1.js'
import RoommatePreferences from './InternRegister/DetailsP2'
import HousingPreferences from './InternRegister/DetailsP3'
import axios from 'axios'
import Landing from './LandingPage/MainLanding'

axios.defaults.baseURL = 'http://localhost:9090'

class WelcomeScreen extends Component {
  componentWillMount(){
    this.setState({
      uid:localStorage.getItem('uid'),
      moderator:localStorage.getItem('moderator'),
    })
  }
  state = {
    uid: null,
    companyLocationList: [],
    moderator: false,
    companyCode:null,
  }

  item = []

  updateUid = (uid) => {
    this.setState({ uid })
    localStorage.setItem('moderator','false')
    if (uid.charAt(0) == 2){
      localStorage.setItem('moderator','true')
      this.setState({ moderator: true })
    }
    localStorage.setItem('uid',uid)
    //console.log(localStorage.getItem('moderator'))
    //console.log(localStorage.getItem('uid'))
  }

  updateCompanyCode=(companyCode)=>{
    this.setState({companyCode})
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
      <div className="mainBox">
        <Switch>
          <Route exact path='/' render={() => <Redirect to='/login' />} />
          <Route exact path='/login' render={() => <Login updateUid={this.updateUid.bind(this)} />} />
          <Route exact path='/register' render={() => <Register updateUid={this.updateUid.bind(this)} updateCompanyCode={this.updateCompanyCode} updateCompanyLocations={this.updateCompanyLocations.bind(this)} />} />
          <Route path='/register/employee' render={() => <NewEmployeeRegister companyLocationList={this.getCompanyLocations.bind(this)} item={this.item} companyCode={this.state.companyCode}/>} />
          <Route path='/register/intern/part1' render={() => <InternRegPart1 uid={history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)} updateUid={this.updateUid.bind(this)} />} />
          <Route path='/intern/user-details' render={() => <UserDetails uid={this.state.uid} />} />
          <Route path='/intern/roommate-preferences' render={() => <RoommatePreferences uid={this.state.uid} />} />
          <Route path='/intern/housing-preferences' render={() => <HousingPreferences uid={this.state.uid} />} />
          <Route path='/landing' render={() => <Landing uid={this.state.uid} employee={this.state.moderator} companyLocationList={this.state.companyLocationList}/>} />
        </Switch>
      </div>
    );
  }
}

export default WelcomeScreen;