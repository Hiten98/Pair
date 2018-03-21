import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
import './LoginButtons.css';

axios.defaults.baseURL = 'http://localhost:9090'

class LoginButtons extends Component {
  

  handleLogin = () => {
    let email = this.props.email
    let password = this.props.password
    let that = this

    if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      alert('Please enter a valid email')
    } else if (email != null && password != null && email != '' && password.length >= 8 && (new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(email)) {
      axios.post('/LOGIN', {
        "username": email,
        "password": password
      }).then((response) => {
        console.log(response.data);
        if (!response.data.status) {
          alert('Username or password was incorrect, please try again')
        } else if (response.data.userID != null) {
          // this.props.updateUid(response.data.userID);
          //console.log(response.data.userID)
          that.props.updateUid(response.data.userID, response.data.authority)
          if (response.data.authority==='admin') {
            history.push('/landing/admin')
          } if (response.data.authority==='company') {
            history.push('/landing/company-landing')
          } else if (response.data.authority==='employee') {
            //GO TO EMPLOYEE Landing Page
            history.push('/landing/employee/chat')
          } else if (response.data.authority==='intern') {
            //GO TO INTERN Landing Page
            history.push('/landing/intern/chat')
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      alert('Please completely fill in email and password')
    }
  }


  render() {
    return (
      <div>
        <Row className='row-sm lbutton'>
          <RaisedButton
            label="Login"
            primary
            onClick={this.handleLogin}
          />
        </Row>
      </div>
    );
  }
}

export default LoginButtons;