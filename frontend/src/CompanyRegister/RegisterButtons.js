import React, { Component } from 'react';
import { Row } from 'react-bootstrap'
import { RaisedButton } from 'material-ui'
import history from '../history'
import axios from 'axios'
//import './RegisterButtons.css';
import CodeField from './CodeField'

axios.defaults.baseURL = 'http://localhost:9090'

class RegisterButtons extends Component {


  handleLogin = () => {
    // Get Values from CodeField
    console.log(this.props);

    /*let that = this

    if (companyCode != null && companyCode.length == 4) {
      axios.post('/GET-COMPANY', {
        "pid": companyCode
      }).then(function (response) {
        //console.log(response.data);
        if (response.data.status) {
          //let parsed = JSON.parse(JSON.stringify(response.data.company))
          let locat = []
          that.props.updateCompany(response.data.name)
          for (var loc in response.data.locations){
            locat.push(response.data.locations[loc])
            that.props.updateLocations(locat)
          }
          //if(co)
          history.push('/register/employee')
        } else {
          alert('Invalid company code, please try again')
        }
      }).catch(function (error) {
        console.log(error);
      });

    } else {
      alert('Invalid company code, please try again')
    }*/
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
