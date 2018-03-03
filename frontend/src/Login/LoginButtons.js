import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
import './LoginButtons.css';

axios.defaults.baseURL = 'http://localhost:9090'

class LoginButtons extends Component {
  goToEmployee=()=>{
    history.push('/home/register')
  }

  handleLogin=()=>{
    let email = this.props.email
    let password = this.props.password
    let that=this

    if(email.indexOf("@")<0){
      alert('Please enter a valid email')
    } else if (email != null && password != null && email != '' && password.length>=8 && email.indexOf("@")>-1) {
      axios.post('/LOGIN', {
        "username": email,
        "password": password
      }).then((response) => {
        //console.log(response.data.userID);
        if(!response.data.status){
          alert('Username or password was incorrect, please try again')
        } else if (response.data.userID != null) {
         // this.props.updateUid(response.data.userID);
          //console.log(response.data.userID)
          that.props.updateUid(response.data.userID)
          if (response.data.userID.charAt(0) == 4){
            history.push('/landing/admin-landing')
          }if (response.data.userID.charAt(0) == 3){
            history.push('/landing/company-landing')
          }else if (response.data.userID.charAt(0) == 2) {
            //GO TO EMPLOYEE Landing Page
            history.push('/landing/employee-landing')
          } else if (response.data.userID.charAt(0) == 1){
            //GO TO INTERN Landing Page
            history.push('/landing/intern-landing')
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

        <Row className='row-sm lbutton'>
          <RaisedButton
            label="Employee Registration"
            primary
            onClick={this.goToEmployee}
          />
        </Row>
      </div>
    );
  }
}

export default LoginButtons;