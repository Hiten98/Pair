import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
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
    }
    console.log(props.props.uid)
    console.log(props.currProfile)
  }

  componentWillReceiveProps = (nextProps) => {
    if (this.props.currProfile != nextProps.currProfile) {
      this.setState({
        currProfile: nextProps.currProfile,
        firstname: '',
        lastname: '',
        bio: '',
        facebook: '',
        twitter: '',
        linkedin: '',
        pic: '',
      }, this.componentDidMount)
    }
  }

  componentDidMount() {
    let that = this
    axios.post("/GET-INTERN", {
      "userID": this.state.currProfile
    }).then(function (response) {
      //console.log(response.data)
      if (!that.state.changed) {
        that.setState({
          firstname: response.data.firstName,
          lastname: response.data.lastName,
          bio: response.data.basic.description,
          facebook: response.data.basic.fbLink,
          twitter: response.data.basic.twitterLink,
          linkedin: response.data.basic.linkedInLink,
        })
      }
    }).catch(function (error) {
      console.log(error);
    })
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

  render() {
    return (
      <Col xs={8}>
        <div className='entire-profile'>
          <Row>
            {(this.state.pic != null) ? <img src={this.state.pic} alt={`${this.state.firstname}'s Profile Picture`} /> : <div></div>}
            <span style={{fontSize:'60px', marginLeft:'40px'}}>{`${this.state.firstname} ${this.state.lastname}`}</span>
          </Row>
        </div>
      </Col>
    );
  }
}

export default DisplayProfile;