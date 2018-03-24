import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
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
          company: response.data.company,
          location: response.data.location,
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

  displayPic = () => {
    if (this.state.pic != null) {
      return (
        <img src={this.state.pic} alt={`${this.state.firstname}'s Profile Picture`} />
      )
    } else
      return null
  }

  displayLink = (link) => {
    if (this.state[link] != null) {
      return (
        <RaisedButton
          label={link}
          className='link'
          secondary
          onClick={()=>{this.goToLink(link)}} />
      )
    }
  }

  goToLink=(address)=>{
    if(this.state[address].trim().indexOf('www.')===0)
      window.open(`http://${this.state[address]}`,true)
    else if(this.state[address].trim().indexOf('http://www.')===0)
      window.open(`${this.state[address]}`,true)
    else if(this.state[address].trim().indexOf('http://')===0)
      window.open(`http://www.${this.state[address].substring(7)}`,true)
    else
      window.open(`http://www.${this.state[address]}`,true)
  }

  render() {
    return (
      <Col xs={8}>
        <div className='entire-profile'>
          <Row>
            {this.displayPic()}
            <span style={{ fontSize: '60px' }}>{`${this.state.firstname} ${this.state.lastname}`}</span>
          </Row>
          {(this.state.bio != null) ? <Row className='row-div'><h3>Bio:</h3> <p>{this.state.bio}</p></Row> : <div></div>}
          <Row className='row-div'>
            {(this.state.linkedin != null || this.state.facebook != null || this.state.twitter != null) ? <h3>Social:</h3> : <div></div>}
            {this.displayLink('linkedin')}
            {this.displayLink('facebook')}
            {this.displayLink('twitter')}
          </Row>
        </div>
      </Col>
    );
  }
}

export default DisplayProfile;