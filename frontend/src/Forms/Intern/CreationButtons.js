import React, { Component } from 'react';
import { RaisedButton } from 'material-ui'
import { Row } from 'react-bootstrap'
import history from '../../history'
import axios from 'axios'

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class CreationButtons extends Component {
  buttonSubmit=()=>{
    let email = this.props.email
    let password = this.props.pass

    //KUNAL PUT YOUR CODE HERE
    //check to make sure password exists
    if (password == null || password.length < 8) {
      alert("Password is shorter than 8 characters")
    } else {
      axios.post('/SET-INTERN-PASSWORD', {
        "userID":this.props.uid,
        "username": email,
        "password": password,
      }).then(function (response) {
        console.log(response.data)
        if (response.data.status == false) {
          console.log("Something went wrong :(")
        } else {
          console.log("Created account password!");
          //Go to preferences p1
          history.push('/register/intern/preferences/user-details')
        }
      }).catch(function (error) {
        console.log(error);
      });

    }
  }

  render() {
    return (
      <Row className='registerPasswordButton'>
        <RaisedButton
          label="Register Password"
          style={{ marginTop: "20px", }}
          primary
          onClick={this.buttonSubmit}
        />
      </Row>
    );
  }
}

export default CreationButtons;