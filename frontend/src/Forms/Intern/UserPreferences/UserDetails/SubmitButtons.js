import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import axios from 'axios'
import history from '../../../../history'
import firebase from '../../../../base'
import './SubmitButton.css';

axios.defaults.baseURL = 'http://localhost:9090'

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
    let firstname = this.props.firstname
    let lastname = this.props.lastname
    let bio = this.props.bio
    let linkedin = this.props.linkedin
    let facebook = this.props.facebook
    let twitter = this.props.twitter
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
        history.push('/register/intern/preferences/roommate')
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
    this.setState({ willRedirect: 1 },()=>{this.buttonSubmit()})
  }

  render() {
    return (
      <Row className="user-details-buttons">
        <RaisedButton
          label="Save"
          style={{ marginTop: "20px", marginRight: "10px" }}
          primary
          onClick={this.buttonSubmit}
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
}

export default SubmitButton;