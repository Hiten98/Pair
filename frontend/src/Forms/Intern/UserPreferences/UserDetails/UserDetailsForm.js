import React, { Component } from 'react';
import FirstName from './FirstName.js'
import LastName from './LastName'
import Bio from './Bio'
import LinkedIn from './LinkedIn'
import Facebook from './Facebook'
import Twitter from './Twitter'
import SubmitButtons from './SubmitButtons'
import axios from 'axios'
//import './UserDetailsForm.css';

axios.defaults.baseURL='http://localhost:9090'

class UserDetailsForm extends Component {
  constructor(props){
    super(props)
    this.state={
      firstname:'',
      lastname:'',
      bio:'',
      linkedin:'',
      facebook:'',
      twitter:'',
    }
  }

  componentDidMount(){
    let that = this
    axios.post('/GET-PREFERENCES/BASIC-PREFERENCES', {
      "uid": this.props.uid,
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        if (response.data.firstName != null)
          that.setState({
            firstname: response.data.firstName,
            lastname: response.data.lastName,
            bio: response.data.description,
            facebook: response.data.fbLink,
            twitter: response.data.twitterLink,
            linkedin: response.data.linkedInLink,
          })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  firstNameChange=(ev)=>{
    this.setState({firstname:ev.target.value})
    this.props.changeChanged(true)
  }

  lastNameChange=(ev)=>{
    this.setState({lastname:ev.target.value})
    this.props.changeChanged(true)
  }

  bioChange=(ev)=>{
    this.setState({bio:ev.target.value})
    this.props.changeChanged(true)
  }

  linkedInChange=(ev)=>{
    this.setState({linkedin:ev.target.value})
    this.props.changeChanged(true)
  }

  facebookChange=(ev)=>{
    this.setState({facebook:ev.target.value})
    this.props.changeChanged(true)
  }

  twitterChange=(ev)=>{
    this.setState({twitter:ev.target.value})
    this.props.changeChanged(true)
  }

  render() {
    return (
      <div>
        <FirstName dv={this.state.firstname} firstNameChange={this.firstNameChange}/>

        <LastName dv={this.state.lastname} lastNameChange={this.lastNameChange}/>

        <Bio dv={this.state.bio} bioChange={this.bioChange}/>

        <LinkedIn dv={this.state.linkedin} linkedInChange={this.linkedInChange}/>

        <Facebook dv={this.state.facebook} facebookChange={this.facebookChange}/>

        <Twitter dv={this.state.twitter} twitterChange={this.twitterChange}/>

        <SubmitButtons {...this.state} changePage={this.props.changePage}/>
      </div>
    );
  }
}

export default UserDetailsForm;