import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../../../../history'
import axios from 'axios'
import '../RoommatePreferences/RoommateSubmitButtons.css';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";
//import './HousingSubmitButtons.css';

//Needs testing after hiten fixes things

class HousingSubmitButtons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      willRedirect: 0,
    }
  }

  backButtonSubmit = () => {
    this.setState({ willRedirect: 1 }, () => { this.bSubmit() })
  }

  buttonSubmit = () => {
    this.setState({ willRedirect: 2 }, () => { this.bSubmit() })
  }

  bSubmit = () => {
    let price = this.props.price
    let roommates = this.props.roommates
    let distance = this.props.distance
    let duration = this.props.duration

    //console.log(duration)
    let that = this
    axios.post('/UPDATE-PREFERENCES/HOUSING-PREFERENCES', {
      "userID": this.props.uid,
      desiredPrice: price,
      desiredRoommate: roommates,
      desiredDistance: distance,
      desiredDuration: duration
    }).then((response) => {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Preferences updated!");
        //Go to landing page
        if (that.state.willRedirect === 1) {
          that.props.changePage(2)
          history.push('/register/intern/edit-profile/roommate')
        } else if (that.state.willRedirect === 2) {
          history.push('/landing/intern/members')
        }
        that.props.changeChange(false)
        try {
          localStorage.removeItem('roommate-preferences')
          localStorage.removeItem('preferences')
        } catch (err) {
          //console.log('This browser does not allow localstorage and some functionalities may be impacted')
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  returnDesktop() {
    return (
      <Row className="roommate-submit-buttons">
        <RaisedButton
          label="Previous"
          sytle={{ marginTop: "20px" }}
          primary
          onClick={this.backButtonSubmit}
        />
        <RaisedButton
          label="Save and quit"
          style={{ marginTop: "20px", marginLeft: "10px" }}
          primary
          onClick={this.buttonSubmit}
        />
      </Row>
    );
  }

  returnMobile() {
    return (
      <div>
        <Row className="roommate-submit-buttons">
          <RaisedButton
            label="Previous"
            sytle={{ marginTop: "20px" }}
            primary
            onClick={this.backButtonSubmit}
          />
        </Row>
        <Row className="roommate-submit-buttons">
          <RaisedButton
            label="Save and quit"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            primary
            onClick={this.buttonSubmit}
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

export default HousingSubmitButtons;