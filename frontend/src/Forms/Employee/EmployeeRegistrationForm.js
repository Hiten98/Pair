import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import FirstName from '../Intern/UserPreferences/UserDetails/FirstName'
import LastName from '../Intern/UserPreferences/UserDetails/LastName'
import Bio from '../Intern/UserPreferences/UserDetails/Bio'
import Facebook from '../Intern/UserPreferences/UserDetails/Facebook'
import LinkedIn from '../Intern/UserPreferences/UserDetails/LinkedIn'
import Twitter from '../Intern/UserPreferences/UserDetails/Twitter'
import Email from './Email'
import Password from './Password'
import Location from './Location'
import EmployeeRegisterButtons from './EmployeeRegisterButtons'
import './EmployeeRegistrationForm.css';


class EmployeeRegistrationForm extends Component {
  constructor(props) {
    super(props)
    //console.log(props.company)
    this.state = {
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      loc: 0,
      bio: '',
      linkedin: '',
      facebook: '',
      twitter: '',
    }
    try {
      const serializedState = localStorage.getItem('employee-register')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('employee-register', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  emailChange=(ev)=>{
    this.setState({email:ev.target.value},()=>{this.saveState()})
    this.saveState()
  }

  passwordChange=(ev)=>{
    this.setState({password:ev},()=>{this.saveState()})
    this.saveState()
  }

  firstNameChange = (ev) => {
    this.setState({ firstname: ev.target.value },()=>{this.saveState()})
    this.saveState()
  }

  lastnameChange=(ev)=>{
    this.setState({lastname:ev.target.value},()=>{this.saveState()})
    this.saveState()
  }

  locationChange=(event,index,value)=>{
    console.log(value)
    this.setState({loc:value},()=>{this.saveState()})
    this.saveState()
  }

  bioChange=(ev)=>{
    this.setState({bio:ev.target.value},()=>{this.saveState()})
    this.saveState()
  }

  linkedinChange=(ev)=>{
    this.setState({linkedin:ev.target.value},()=>{this.saveState()})
    this.saveState()
  }

  facebookChange = (ev) => {
    this.setState({ facebook: ev.target.value },()=>{this.saveState()})
    this.saveState()
  }

  twitterChange=(ev)=>{
    this.setState({twitter:ev.target.value},()=>{this.saveState()})
    this.saveState()
  }

  render() {
    return (
      <div>
        <Row className='employee-title'>
          Employee Registration
        </Row>

        <Email change={this.emailChange} dv={this.state.email}/>

        <Password change={this.passwordChange} dv={this.state.password}/>

        <FirstName firstNameChange={this.firstNameChange} dv={this.state.firstname}/>

        <LastName lastNameChange={this.lastnameChange} dv={this.state.lastname}/>

        <Location change={this.locationChange} company={this.props.company} locations={this.props.locations} dv={this.state.loc}/>

        <Bio bioChange={this.bioChange} dv={this.state.bio}/>

        <LinkedIn linkedInChange={this.linkedinChange} dv={this.state.linkedin}/>

        <Facebook facebookChange={this.facebookChange} dv={this.state.facebook}/>

        <Twitter twitterChange={this.twitterChange} dv={this.state.twitter}/>

        <EmployeeRegisterButtons {...this.state} company={this.props.company} locations={this.props.locations} updateUid={this.props.updateUid}/>
      </div>
    );
  }
}

export default EmployeeRegistrationForm;