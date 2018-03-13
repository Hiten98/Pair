import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'
import history from '../../history'
import axios from 'axios'
//import './LandingScreen.css';

axios.defaults.baseURL = 'http://localhost:9090'

class LandingScreen extends Component {
  buttonSubmit = () => {
    let email = this.props.email
    let password = this.props.password
    let firstname = this.props.firstname
    let lastname = this.props.lastname
    let location = this.props.loc
    let bio = this.props.bio
    let linkedin = this.props.linkedin
    let facebook = this.props.facebook
    let twitter = this.props.twitter
    let company = this.props.company

    if (email.length < 1 || !(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      alert('Incorrect email format')
    } else if (password.length < 8) {
      alert('Invalid password')
    } else if (firstname.length < 1) {
      alert('Firstname is required')
    } else if (lastname.length < 1) {
      alert('Lastname is required')
    } else if (location === 0) {
      alert('Please choose a location')
    } else {
      location = this.props.locations[location]
      let that = this
      axios.post('/CREATE-EMPLOYEE', {
        "username": email,
        "password": password,
        "firstName": firstname,
        "lastName": lastname,
        "company": company,
        "location": location,
        "description": bio,
        "facebook": facebook,
        "linkedin": linkedin,
        "twitter": twitter
      }).then(function (response) {
        if (!response.data.status) {
          console.log("Something went wrong :(")
        } else {
          console.log("Created account password!");
          //Go to employee page
          //console.log(response)
          that.props.updateUid(response.data.userID,'employee')
          try {
            localStorage.removeItem('employee-register')
          } catch (err) {
            //console.log('This browser does not allow localstorage and some functionalities may be impacted')
          }
          history.push('/landing/employee/chat')
          
        }
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <RaisedButton
          label="Register Account"
          style={{ marginTop: "20px" }}
          primary
          onClick={this.buttonSubmit}
        />
      </div>
    );
  }
}

export default LandingScreen;