import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../../../../history'
import axios from 'axios'
import './RoommateSubmitButtons.css';

axios.defaults.baseURL='http://localhost:9090'

class RoommateSubmitButtons extends Component {
  constructor(props){
    super(props)
    this.state={
      willRedirect:0,
    }
  }

  backButtonSubmit=()=>{
    this.setState({willRedirect:1})
    this.bSubmit()
  }

  buttonSubmit=()=>{
    this.setState({willRedirect:2})
    this.bSubmit()
  }

  bSubmit=()=>{
    let youguest = this.props.youBringGuest
    let themguest = this.props.themBringGuest
    let youpet = this.props.youBringPet
    let thempet = this.props.themBringPet
    let sharing = this.props.sharing
    let smoke = this.props.smoke
    let bedtime = this.props.bedtime
    let waketime = this.props.waketime
    let lights = this.props.lights
    let clean = this.props.clean

    let that = this
    axios.post('/UPDATE-PREFERENCES/ROOMMATE-PREFERENCES', {
      "userID": this.props.uid,
      "youguest": youguest,
      "themguest": themguest,
      "youpet": youpet,
      "thempet": thempet,
      "sharing": sharing,
      "smoke": smoke,
      "bedtime": bedtime,
      "waketime": waketime,
      "lights": lights,
      "clean": clean
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        console.log("Preferences updated!");
        //Go to preferences p3
        if(that.state.willRedirect===1){
          this.props.changePage(1)
          history.push('/register/intern/preferences/user-details')
        }else if(that.state.willRedirect===2){
          this.props.changePage(3)
          history.push('/register/intern/preferences/housing')
        }
        this.props.changeChange(false)
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
          style={{ marginTop: "20px", marginLeft:"10px" }}
          primary
          onClick={this.bSubmit}
        />
        <RaisedButton
          label="Next"
          style={{ marginTop: "20px", marginLeft:"10px" }}
          primary
          onClick={this.buttonSubmit}
        />
      </Row>
    );
  }
}

export default RoommateSubmitButtons;