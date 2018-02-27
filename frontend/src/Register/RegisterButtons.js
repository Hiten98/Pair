import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
//import './RegisterButtons.css';

axios.defaults.baseURL = 'http://localhost:9090'

class RegisterButtons extends Component {
  goToLogin = () => {
    history.push('/home/login')
  }

  handleLogin = () => {
    const companyCode = this.props.companyCode
    let that = this

    if (companyCode != null && companyCode.length == 4) {
      axios.post('/GET-COMPANY', {
        "pid": companyCode
      }).then(function (response) {
        //console.log(response.data);
        if (response.data.status) {
          let parsed = JSON.parse(JSON.stringify(response.data.company))
          let locat = []
          let co = ''
          let i = 0
          for (var location in parsed) {
            //Make a locations item
            //console.log(response.data.company)
            if (i != 0) {
              locat.push(parsed[location])
            } else {
              co = parsed[location]
            }
            i++
            //console.log(locat)
            that.props.updateLocations(locat)
            that.props.updateCompany(co)
          }
          history.push('/register/employee')
        } else {
          alert('Invalid company code, please try again')
        }
      }).catch(function (error) {
        console.log(error);
      });

    } else {
      alert('Invalid company code, please try again')
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

        <Row className='row-sm lbutton'>
          <RaisedButton
            label="Login Page"
            primary={true}
            onClick={this.goToLogin}
          />
        </Row>
      </div>
    );
  }
}

export default RegisterButtons;