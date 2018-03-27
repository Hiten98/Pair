import React, { Component } from 'react';
import history from '../../history'
import Email from './Email.js'
import Password from './Password'
import CreationButtons from './CreationButtons'
import axios from 'axios'
//import './InternCreation.css';

class InternCreation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: 0,
      email: '',
      pass: '',
    }
  }

  userID = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1)

  changeEmail = (email) => {
    this.setState({ email: email })
  }

  changePass = (pass) => {
    this.setState({ pass: pass })
  }

  componentDidMount() {
    // console.log(this.userID)
    if (this.userID == '' || this.userID == 'creation') {
      // console.log('hi')
      history.push('/')
    } else {
      let that = this
      let name = ''
      let distance = ''
      let smoke = ''
      let status=''
      axios.post('/GET-INTERN', {
        userID: this.userID
      }).then(function (response) {
        console.log(response.data)
        if (response.data.status==null) {
          name = response.data.firstName
          distance = response.data.housing.desiredDistance
          smoke = response.data.roommate.smoke
          if ((name != 'undefined' || distance != 'undefined' || smoke != 'undefined')) {
            alert('You already have an account, please login to view')
            history.push('/')
          }
        } else {
          alert('Error: you do not have the required access, to try again use the link provided in the email you recieved')
          history.push('/')
        }
      }).catch(function (error) {
        console.log(error);
      })
      this.setState({
        uid: this.userID,
      })
      this.props.updateUid(this.userID, 'intern')
    }
  }

  render() {
    return (
      <div>
        <Email uid={this.userID} changeEmail={this.changeEmail} />

        <Password changePass={this.changePass} />

        <CreationButtons {...this.state} />
      </div>
    );
  }
}

export default InternCreation;