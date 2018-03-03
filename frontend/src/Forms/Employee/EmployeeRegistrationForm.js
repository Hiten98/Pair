import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
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
      location: 0,
      bio: '',
      linkedin: '',
      facebook: '',
      twitter: '',
    }
  }

  emailChange=(ev)=>{
    this.setState({email:ev.target.value})
  }

  passwordChange=(ev)=>{
    this.setState({password:ev})
  }

  firstNameChange = (ev) => {
    this.setState({ firstname: ev.target.value })
  }

  lastnameChange=(ev)=>{
    this.setState({lastname:ev.target.value})
  }

  locationChange=(event,index,value)=>{
    this.setState({location:value})
  }

  bioChange=(ev)=>{
    this.setState({bio:ev.target.value})
  }

  linkedinChange=(ev)=>{
    this.setState({linkedin:ev.target.value})
  }

  facebookChange = (ev) => {
    this.setState({ facebook: ev.target.value })
  }

  twitterChange=(ev)=>{
    this.setState({twitter:ev.target.value})
  }

  render() {
    return (
      <div>
        <Row className='employee-title'>
          Employee Registration
        </Row>

        <Email change={this.emailChange}/>

        <Password change={this.passwordChange}/>

        <FirstName firstNameChange={this.firstNameChange}/>

        <LastName lastNameChange={this.lastnameChange}/>

        <Location change={this.locationChange} company={this.props.company} locations={this.props.locations} dv={this.state.location}/>

        <Bio bioChange={this.bioChange}/>

        <LinkedIn linkedInChange={this.linkedinChange}/>

        <Facebook facebookChange={this.facebookChange}/>

        <Twitter twitterChange={this.twitterChange}/>

        <EmployeeRegisterButtons {...this.state} company={this.props.company} locations={this.props.locations}/>
      </div>
    );
  }
}

export default EmployeeRegistrationForm;