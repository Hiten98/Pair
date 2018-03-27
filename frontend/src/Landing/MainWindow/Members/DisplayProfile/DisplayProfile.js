import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { lightGreenA700, yellow800, red500 } from 'material-ui/styles/colors';
import Links from './Links.js'
import ProfileHeader from './ProfileHeader'
import CompanyInformation from './CompanyInformation'
import './DisplayProfile.css';

class DisplayProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: props.props.uid,
      currProfile: props.currProfile,
      firstname: '',
      lastname: '',
      bio: '',
      facebook: '',
      twitter: '',
      linkedin: '',
      pic: '',
      match: '',
      ban: false,
      temp:false,
    }
    // console.log(props.props.uid)
    // console.log(props.currProfile)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currProfile != nextProps.currProfile||this.props.temp!=nextProps.temp) {
      this.setState({
        currProfile: nextProps.currProfile,
        firstname: '',
        lastname: '',
        bio: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        pic: '',
        match: '',
        temp:false,
      }, this.componentDidMount)
    }
  }

  componentDidMount() {
    let that = this
    //get info if intern
    if (this.state.currProfile.substring(0, 1) == 1) {
      axios.post("/GET-INTERN", {
        "userID": this.state.currProfile
      }).then(function (response) {
        // console.log(response.data)
        // if (!that.state.changed) {
          that.setState({
            firstname: response.data.firstName,
            lastname: response.data.lastName,
            bio: response.data.basic.description,
            facebook: response.data.basic.fbLink,
            twitter: response.data.basic.twitterLink,
            linkedin: response.data.basic.linkedInLink,
            company: response.data.company,
            location: response.data.location,
            ban:response.data.banned,
          })
        // }
      }).catch(function (error) {
        console.log(error);
      })

      if (this.props.props.type == 'intern' && this.state.currProfile != this.props.props.uid) {
        let tempUid = [this.state.currProfile]
        axios.post('/COMPARE-INTERNS', {
          userID1: this.props.props.uid,
          userID2: tempUid,
        }).then(function (response) {
          let score = ''
          if (parseInt(response.data.score[0]) > 80) {
            score = <span style={{ color: lightGreenA700, fontSize: '20px', }}>{response.data.score[0]}% match </span>
          } else if (parseInt(response.data.score[0]) > 50) {
            score = <span style={{ color: yellow800, fontSize: '20px', }}>{response.data.score[0]}% match </span>
          } else if (parseInt(response.data.score[0]) > 0){
            score = <span style={{ color: red500, fontSize: '20px', }}>{response.data.score[0]}% match </span>
          } else {
            console.log("Will");
            score = <span style={{ color: red500, fontSize: '20px', }}>{0}% match </span>
          }
          that.setState({ match: score })
        }).catch(function (error) {
          console.log(error);
        })
      }
    } else if(this.state.currProfile.substring(0,1)==2){
      axios.post("/GET-EMPLOYEE", {
        "userID": this.state.currProfile
      }).then(function (response) {
        // console.log(response.data)
        // if (!that.state.changed) {
          that.setState({
            firstname: response.data.firstName,
            lastname: response.data.lastName,
            bio: response.data.description,
            facebook: response.data.links[0],
            twitter: response.data.links[2],
            linkedin: response.data.links[1],
            company: response.data.company,
            location: response.data.location,
          })
        // }
      }).catch(function (error) {
        console.log(error);
      })
    }
    //ADD IN CODE TO GET THE PICTURE FROM THE SERVER
    axios.post("/GET-IMAGE", {
      "userID": this.state.currProfile
    }).then(function (response) {
      //console.log(response.data)
      that.setState({ pic: response.data.image })
    }).catch(function (error) {
      console.log(error);
    })
  }

  updateProfile=()=>{
    this.props.updateProfile()
  }

  render() {
    return (
      <Col xs={8}>
        <div className='entire-profile'>
          <ProfileHeader {...this.props} {...this.state} updateProfile={this.updateProfile}/>

          <CompanyInformation {...this.props} {...this.state} updateProfile={this.updateProfile}/>

          {(this.state.bio != 'undefined') ? <Row className='row-div'><h3>Bio:</h3> <p>{this.state.bio}</p></Row> : <div></div>}

          <Links {...this.props} {...this.state} updateProfile={this.updateProfile}/>
        </div>
      </Col>
    );
  }
}

export default DisplayProfile;