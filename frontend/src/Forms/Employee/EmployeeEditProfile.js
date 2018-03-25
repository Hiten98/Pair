import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import FirstName from '../Intern/UserPreferences/UserDetails/FirstName'
import LastName from '../Intern/UserPreferences/UserDetails/LastName'
import Bio from '../Intern/UserPreferences/UserDetails/Bio'
import Facebook from '../Intern/UserPreferences/UserDetails/Facebook'
import LinkedIn from '../Intern/UserPreferences/UserDetails/LinkedIn'
import Twitter from '../Intern/UserPreferences/UserDetails/Twitter'
import Location from './Location'
import EmployeeRegisterButtons from './EmployeeRegisterButtons'
import './EmployeeRegistrationForm.css';
import history from '../../history';
import PicUpload from '../Intern/UserPreferences/UserDetails/PicUpload';
import axios from 'axios'


class EmployeeEditProfile extends Component {
  constructor(props) {
    super(props)
    //console.log(props.company)
    this.state = {
      firstname: '',
      lastname: '',
      loc: 0,
      bio: '',
      linkedin: '',
      facebook: '',
      twitter: '',
      pic: '',
      prevpic: '',
      locations:[],
      company:'',
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

  componentDidMount = () => {
    let that=this
    axios.post("/GET-EMPLOYEE", {
      "userID": this.props.uid
    }).then(function (response) {
      console.log(response.data)
      if (response.data.status==false) {
        alert('Error, please try again')
        history.push('/landing/employee/members')
      }
      that.setState({
        firstname:response.data.firstName,
        lastname:response.data.lastName,
        loc:response.data.location,
        bio:response.data.description,
        linkedin:response.data.links[1],
        facebook:response.data.links[0],
        twitter:response.data.links[2],
        company:response.data.company,
      }, that.getCompanyInfo)
    }).catch(function (error) {
      console.log(error);
    })
    axios.post("/GET-IMAGE", {
      "userID": this.props.uid
    }).then(function (response) {
      //console.log(response.data)
      that.setState({prevpic:response.data.image})
    }).catch(function (error) {
      console.log(error);
    })
  }

  getCompanyInfo=()=>{
    let that=this
    axios.post("/GET-COMPANY-FROM-NAME", {
      "name": this.state.company
    }).then(function (response) {
      console.log(response.data)
      that.setState({locations:response.data.locations})
    }).catch(function (error) {
      console.log(error);
    })
  }


  firstNameChange = (ev) => {
    this.setState({ firstname: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  lastnameChange = (ev) => {
    this.setState({ lastname: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  locationChange = (event, index, value) => {
    // console.log(value)
    this.setState({ loc: value }, () => { this.saveState() })
    this.saveState()
  }

  bioChange = (ev) => {
    this.setState({ bio: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  linkedinChange = (ev) => {
    this.setState({ linkedin: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  facebookChange = (ev) => {
    this.setState({ facebook: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  twitterChange = (ev) => {
    this.setState({ twitter: ev.target.value }, () => { this.saveState() })
    this.saveState()
  }

  changePic = (i) => {
    this.setState({ pic: i })
  }

  render() {
    return (
      <div>
        <Row className='employee-title'>
          Edit Profile
        </Row>

        <FirstName firstNameChange={this.firstNameChange} dv={this.state.firstname} />

        <LastName lastNameChange={this.lastnameChange} dv={this.state.lastname} />

        <Location change={this.locationChange} company={this.props.company} locations={this.props.locations} dv={this.state.loc} />

        <Bio bioChange={this.bioChange} dv={this.state.bio} />

        <LinkedIn linkedInChange={this.linkedinChange} dv={this.state.linkedin} />

        <Facebook facebookChange={this.facebookChange} dv={this.state.facebook} />

        <Twitter twitterChange={this.twitterChange} dv={this.state.twitter} />

        <PicUpload changePic={this.changePic} pic={this.state.pic} prevpic={this.state.prevpic} />

        <EmployeeRegisterButtons {...this.state} company={this.props.company} locations={this.props.locations} updateUid={this.props.updateUid} />
      </div>
    );
  }
}

export default EmployeeEditProfile;