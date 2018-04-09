import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import axios from 'axios'
import history from '../../../../history'
import firebase from '../../../../base'
import './SubmitButton.css';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class SubmitButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      willRedirect: 0,
    }
  }

  submitPicture = (picture) => {
    //Setup references to database
    if (this.props.pic != '') {
      var ref = firebase.database().ref();
      var storageRef = firebase.storage().ref();
      var internRef = ref.child("User/Interns");
      let ID = this.props.uid
      let image = this.props.pic.substring(this.props.pic.indexOf(',') + 1)

      var imageRef = internRef.child(ID).child("images");

      var task = storageRef.child(ID + "/").putString(image, 'base64').then(function (snapshot) {
        picture = true
        console.log('Uploaded a base64 string!');
      }).then(() => {
        storageRef.child(ID + "/").getDownloadURL().then(function (url) {
          imageRef.child("image").set(url);
        });
      })
    } else {
      picture = true
    }
    return picture
  }

  buttonSubmit = () => {
    let fn = ''
    if (this.props.firstname != undefined)
      fn = this.props.firstname
    let ln = ''
    if (this.props.lastname != undefined)
      ln = this.props.lastname
    let d = 'undefined'
    if (this.props.bio != undefined)
      d = this.props.bio
    let f = 'undefined'
    if (this.props.facebook != undefined)
      f = this.props.facebook
    let t = 'undefined'
    if (this.props.twitter != undefined)
      t = this.props.twitter
    let l = 'undefined'
    if (this.props.linkedin != undefined)
      l = this.props.linkedin
    let firstname = fn
    let lastname = ln
    let bio = d
    let linkedin = l
    let facebook = f
    let twitter = t
    var pic = this.props.pic;
    let preferences = false
    let picture = false

    //console.log(firstname)
    let that = this
    //console.log(firstname)
    if (lastname == null || firstname == null || lastname == '' || firstname == '') {
      alert("Missing required fields")
    } else {
      axios.post('/UPDATE-PREFERENCES/BASIC-PREFERENCES', {
        "userID": this.props.uid,
        firstName: firstname,
        lastName: lastname,
        description: bio,
        fbLink: facebook,
        twitterLink: twitter,
        linkedInLink: linkedin,
      }).then(function (response) {
        //console.log(response.data)
        if (response.data.status == false) {
          console.log("Something went wrong :(")
        } else {
          preferences = true
        }
        let picture = that.submitPicture(picture)
      }).catch(function (error) {
        console.log(error);
      })


      console.log("Preferences updated!");
      //Go to preferences p2
      if (that.state.willRedirect === 1) {
        that.props.changePage(2)
        history.push('/register/intern/edit-profile/roommate')
      } else if (that.state.willRedirect === 2) {
        history.push('/landing/intern/members')
      }
      that.props.changeChange(false)
      that.props.changeCompleted('1')
      try {
        localStorage.removeItem('user-details')
      } catch (err) {
        //console.log('This browser does not allow localstorage and some functionalities may be impacted')
      }

    }
  }

  bSubmit = () => {
    this.setState({ willRedirect: 1 }, () => { this.buttonSubmit() })
  }

  saveAndQuit = () => {
    this.setState({ willRedirect: 2 }, () => { this.buttonSubmit() })
  }

  returnDesktop() {
    return (
      <Row className="user-details-buttons">
        <RaisedButton
          label="Save and Quit"
          style={{ marginTop: "20px", marginRight: "10px" }}
          primary
          onClick={this.saveAndQuit}
        />
        <RaisedButton
          label="Next"
          style={{ marginTop: "20px", }}
          primary
          onClick={this.bSubmit}
        />
      </Row>
    );
  }

  returnMobile() {
    return (
      <div  className="user-details-buttons">
        <Row>
          <RaisedButton
            label="Save and Quit"
            style={{ marginTop: "20px", marginRight: "10px" }}
            primary
            onClick={this.saveAndQuit}
          />
        </Row>
        <Row>
          <RaisedButton
            label="Next"
            style={{ marginTop: "20px", }}
            primary
            onClick={this.bSubmit}
          />
        </Row>
      </div>
    );
  }

  render() {
    let width = window.innerWidth
      || document.documentElement.clientWidth
      || document.body.clientWidth;
    // console.log(width)
    //console.log(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent))
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini|Mobile/i.test(navigator.userAgent) || width < 400) {
      return this.returnMobile();
    } else {
      return this.returnDesktop();
    }
  }
}

export default SubmitButton;