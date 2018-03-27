import React, { Component } from 'react';
import { RaisedButton, Snackbar } from 'material-ui'
import { Row } from 'react-bootstrap'
import history from '../history'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:9090";
//TEST TO MAKE SURE THIS WORKS WITH BOTH EMPLOYEES AND INTERNS

class ForgotPasswordSubmit extends Component {
  constructor(props){
    super(props)
    this.state={
      open:false,
    }
  }
  buttonSubmit=()=>{
    let that=this
    let email = this.props.email
    let password = this.props.pass1
    let uid=this.props.uid

    //KUNAL PUT YOUR CODE HERE
    //check to make sure password exists
    if (password == null || password.length < 8) {
      alert("Password is shorter than 8 characters")
    } else {
      axios.post('/FORGOT-PASSWORD', { 
        "userID":uid,
        "username": email,
        "password": password,
      }).then(function (response) {
        // console.log(response.data)
        if (response.data.status == false) {
          console.log("Something went wrong :(")
        } else {
          // console.log("Changed account password!");
          //Go to preferences p1
          that.setState({open:true})
          history.push('/')
        }
      }).catch(function (error) {
        alert('Error: link broken')
        history.push('/')
        console.log(error);
      });

    }
  }

  handleRequestClose=()=>{
    this.setState({open:false})
  }

  render() {
    return (
      <Row className='registerPasswordButton'>
        <RaisedButton
          label="Change Password"
          style={{ marginTop: "20px", }}
          primary
          onClick={this.buttonSubmit}
        />
        <Snackbar
          open={this.state.open}
          message="Account password has been changed"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </Row>
    );
  }
}

export default ForgotPasswordSubmit;