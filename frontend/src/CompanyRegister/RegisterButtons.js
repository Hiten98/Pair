import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
//import './RegisterButtons.css';

axios.defaults.baseURL = 'http://localhost:9090'

class RegisterButtons extends Component {


  handleLogin = () => {
    // Get Values from CodeField
    let companyName = this.props.companyName;
    let companyEmail = this.props.companyEmail;
    let companyPassword = this.props.companyPassword;
    let companyLocations = this.props.companyLocations;
    let companyLocationsParsed;
    if (companyLocations != null)
      companyLocationsParsed = companyLocations.split(';');
    /*console.log(companyName);
    console.log(companyEmail);
    console.log(companyPassword);
    console.log(companyLocationsParsed);*/

    let that = this

    if (companyName === null || companyEmail === null || companyPassword === null || companyLocations === null) {
      alert('Please fill in all the fields')
    } else if (!(new RegExp('[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+[.][A-Za-z]{2,}')).test(companyEmail)) {
      alert('Please enter a valid email')
    } else if (!(new RegExp('^((([A-Za-z ,]+;)+[A-Za-z ,]+)|[A-Za-z ,]+)+$')).test(companyLocations)) {
      alert("Locations format is invalid")
    } else if (companyName != null && companyEmail != null && companyPassword != null && companyLocations != null) {
      axios.post('/CREATE-COMPANY', {
        "companyName": companyName,
        "email": companyEmail,
        "password": companyPassword,
        "locations": companyLocationsParsed,
        "employees": ""
      }).then(function (response) {
        console.log(response.data);
        if (response.data.status) {
          //history.push('/register/company')
        } else {
          alert('Invalid company details, please try again')
        }
      }).catch(function (error) {
        console.log(error);
      });

      // Go to Company Page?
      console.log(companyName);
      that.props.updateUid(companyName, "company");
      history.push('/landing/company')
    }
  }

  render() {
    return (
      <div>
        <Row className='row-sm lbutton'>
          <RaisedButton
            label="Register"
            primary={true}
            onClick={this.handleLogin}
          />
        </Row>
      </div>
    );
  }
}

export default RegisterButtons;
