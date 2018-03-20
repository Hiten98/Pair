import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../../../../history'
import axios from 'axios'
import '../RoommatePreferences/RoommateSubmitButtons.css';

axios.defaults.baseURL = 'http://localhost:9090'
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
    this.setState({ willRedirect: 1 })
    this.bSubmit()
  }

  buttonSubmit = () => {
    this.setState({ willRedirect: 2 })
    this.bSubmit()
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
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Preferences updated!");
        //Go to landing page
        if (that.state.willRedirect === 1) {
          that.props.changePage(2)
          history.push('/register/intern/preferences/roommate')
        } else if (that.state.willRedirect === 2) {
          if (that.props.completed.indexOf('1') > -1 && that.props.completed.indexOf('2') > -1) {
            history.push('/landing/interns/chat')
          }else{
            alert('Please complete all parts of this form')
          }
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

  render() {
    return (
      <Row className="roommate-submit-buttons">
        <RaisedButton
          label="Previous"
          sytle={{ marginTop: "20px" }}
          primary
          onClick={this.backButtonSubmit}
        />
        <RaisedButton
          label="Save"
          style={{ marginTop: "20px", marginLeft: "10px" }}
          primary
          onClick={this.bSubmit}
        />
        <RaisedButton
          label="Submit"
          style={{ marginTop: "20px", marginLeft: "10px" }}
          primary
          onClick={this.buttonSubmit}
        />
      </Row>
    );
  }
}

export default HousingSubmitButtons;