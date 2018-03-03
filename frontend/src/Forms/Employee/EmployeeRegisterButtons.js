import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
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
    let location = this.props.location
    let bio = this.props.bio
    let linkedin = this.props.linkedin
    let facebook = this.props.facebook
    let twitter = this.props.twitter
    let company=this.props.company

    if (email.length < 1 || email.indexOf("@") < 0) {
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
      location=this.props.locations[location]
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
        if (response.data.status == false) {
          console.log("Something went wrong :(")
        } else {
          console.log("Created account password!");
          //Go to employee page
          console.log(response)
          let parsed = JSON.parse(JSON.stringify(response.data))
          let i = 0;
          for (let a in parsed) {
            if (i == 0) {
              console.log(parsed[a])
              that.props.updateUid(`${parsed[a]}`)
              history.push('/landing/employee/chat')
            }
          }

          //history.push('/landing/employee/interns')
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