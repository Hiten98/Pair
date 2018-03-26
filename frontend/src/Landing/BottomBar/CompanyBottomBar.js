import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Row, Col } from 'react-bootstrap'
import './BottomBar.css';
import { RaisedButton } from 'material-ui'
import PasswordField from 'material-ui-password-field'
import AddLocationModal from './AddLocationModal'
import AddEmployeeModal from './AddEmployeeModal'
import axios from 'axios'

class BottomBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      employeeModal: false,
      locationModal: false,
      pin: null,
    }
  }

  addLocation = () => {
    this.setState({ locationModal: true });
  }

  closeLocationModal = () => {
    this.setState({ locationModal: false });
  }

  componentDidMount() {
    let that = this

    axios.post('/GET-COMPANY-FROM-NAME', {
      "name": this.props.uid
    }).then(function (response) {
      //console.log(response.data);
      that.setState({ pin: response.data.pin })

    }).catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div>
        <Col xs={4} className="addEmployee">
          <AddEmployeeModal pin={this.state.pin} />
        </Col>
        <Col xs={4}>

        </Col>
        <Col xs={4} className="addLocation">
          <AddLocationModal companyName={this.props.uid} />
        </Col>
      </div>
    );
  }
}

export default BottomBar;
