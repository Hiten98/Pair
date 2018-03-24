import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { RaisedButton } from 'material-ui'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { lightGreenA700, yellow800, red500 } from 'material-ui/styles/colors';
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
    }
    // console.log(props.props.uid)
    // console.log(props.currProfile)
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
        match: '',
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
    
    if (this.props.props.type == 'intern') {
      let tempUid = [this.state.currProfile]
      axios.post('/COMPARE-INTERNS', {
        userID1: this.props.props.uid,
        userID2: tempUid,
      }).then(function (response) {
        let score=''
        if (parseInt(response.data.score[0]) > 80) {
          score=<span style={{ color: lightGreenA700,fontSize:'20px', }}>{response.data.score[0]}% match </span>
        } else if (parseInt(response.data.score[0]) > 50) {
          score=<span style={{ color: yellow800,fontSize:'20px', }}>{response.data.score[0]}% match </span>
        } else {
          score=<span style={{ color: red500,fontSize:'20px', }}>{response.data.score[0]}% match </span>
        }
        that.setState({match:score})
      }).catch(function (error) {
        console.log(error);
      })
    }
  }

  displayPic = () => {
    if (this.state.pic != null) {
      return (
        <Col xs={4}>
          <img src={this.state.pic} alt={`${this.state.firstname}'s Profile Picture`} />
        </Col>
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
          onClick={() => { this.goToLink(link) }} />
      )
    }
  }

  goToLink = (address) => {
    if (this.state[address].trim().indexOf('www.') === 0)
      window.open(`http://${this.state[address]}`, true)
    else if (this.state[address].trim().indexOf('http://www.') === 0)
      window.open(`${this.state[address]}`, true)
    else if (this.state[address].trim().indexOf('http://') === 0)
      window.open(`http://www.${this.state[address].substring(7)}`, true)
    else
      window.open(`http://www.${this.state[address]}`, true)
  }

  modSettings = () => {
    //console.log(this.props.props.type)
    if (this.props.props.type == 'employee') {
      console.log('hi')
    }
  }

  render() {
    return (
      <Col xs={8}>
        <div className='entire-profile'>
          <Row>
            {this.displayPic()}
            <Col xs={8}>
              <Row>
              <span style={{ fontSize: '60px' }}>{`${this.state.firstname} ${this.state.lastname}`}</span>
              </Row>
              <Row>
              {(this.props.props.type=='intern')?this.state.match:<div></div>}
              </Row>
            </Col>
          </Row>
          {this.modSettings()}
          <Row className='row-div company-info'>
            <Col xs={6}>
              <h3>Company:</h3>
              <p> {this.state.company}</p>
            </Col>
            <Col xs={6}>
              <h3>Location:</h3>
              <p> {this.state.location}</p>
            </Col>
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