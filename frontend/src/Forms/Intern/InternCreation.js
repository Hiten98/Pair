import React, { Component } from 'react';
import history from '../../history'
import Email from './Email.js'
import Password from './Password'
import CreationButtons from './CreationButtons'
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
    if (this.userID == '' || this.userID == 'creation') {
      history.push('/')
    } else {

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