import React, { Component } from 'react';
import FirstName from './FirstName.js'
import LastName from './LastName'
import Bio from './Bio'
import LinkedIn from './LinkedIn'
import Facebook from './Facebook'
import Twitter from './Twitter'
import SubmitButtons from './SubmitButtons'
import PicUpload from './PicUpload'
import axios from 'axios'
//import './UserDetailsForm.css';

axios.defaults.baseURL = 'http://localhost:9090'

//NEEDS TESTING

class UserDetailsForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      lastname: '',
      bio: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      pic:'',
      changed: false,
    }

    try {
      const serializedState = localStorage.getItem('user-details')
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
      localStorage.setItem('user-details', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  componentDidMount() {
    let that = this
    axios.post("/GET-INTERN", {
      "userID": this.props.uid
    }).then(function (response) {
      //console.log(response.data)
      if (!that.state.changed) {
        that.setState({
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          bio: response.data.basic.description,
          facebook: response.data.basic.fbLink,
          twitter: response.data.basic.twitterLink,
          linkedin: response.data.basic.linkedInLink,
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
    //ADD IN CODE TO GET THE PICTURE FROM THE SERVER
  }

  firstNameChange = (ev) => {
    this.setState({ firstname: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  lastNameChange = (ev) => {
    this.setState({ lastname: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  bioChange = (ev) => {
    this.setState({ bio: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  linkedInChange = (ev) => {
    this.setState({ linkedin: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  facebookChange = (ev) => {
    this.setState({ facebook: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  twitterChange = (ev) => {
    this.setState({ twitter: ev.target.value, changed: true }, () => { this.saveState() })
    this.props.changeChanged(true)
  }

  changeChanged = (i) => {
    this.setState({ changed: i })
    this.props.changeChanged(i)
  }

  changePic=(i)=>{
    this.setState({pic:i})
  }

  render() {
    return (
      <div>
        <FirstName dv={this.state.firstname} firstNameChange={this.firstNameChange}  />

        <LastName dv={this.state.lastname} lastNameChange={this.lastNameChange} />

        <Bio dv={this.state.bio} bioChange={this.bioChange}  />

        <LinkedIn dv={this.state.linkedin} linkedInChange={this.linkedInChange}  />

        <Facebook dv={this.state.facebook} facebookChange={this.facebookChange} />

        <Twitter dv={this.state.twitter} twitterChange={this.twitterChange} />

        <PicUpload changePic={this.changePic}/>

        <SubmitButtons {...this.state} uid={this.props.uid} changePage={this.props.changePage} changeChange={this.changeChanged} changeCompleted={this.props.changeCompleted}/>
      </div>
    );
  }
}

export default UserDetailsForm;