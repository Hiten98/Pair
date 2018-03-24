import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'
import history from '../../history'
import axios from 'axios'
import firebase from '../../base'
//import './LandingScreen.css';

axios.defaults.baseURL = "http://localhost:9090";

class LandingScreen extends Component {
  submitPicture = (ID) => {
    //Setup references to database
    var ref = firebase.database().ref();
    var storageRef = firebase.storage().ref();
    var internRef = ref.child("User/Employees");
    let image = this.props.pic.substring(this.props.pic.indexOf(',') + 1)

    var imageRef = internRef.child(ID).child("images");

    var task = storageRef.child(ID + "/").putString(image, 'base64').then(function (snapshot) {
      //console.log('Uploaded a base64 string!');
    }).then(() => {
      storageRef.child(ID + "/").getDownloadURL().then(function (url) {
        imageRef.child("image").set(url);
      });
    })

  }

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
    let pic = this.props.pic

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
          that.props.updateUid(response.data.userID, 'employee')
          that.submitPicture(response.data.userID)
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