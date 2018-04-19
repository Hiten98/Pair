import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import './BottomBar.css';
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
      verified:'false',
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
      that.setState({ pin: response.data.pin, verified:response.data.verified })

    }).catch(function (error) {
      console.log(error);
    });

  }

  render() {
    return (
      <div>
        <Col xsHidden sm={4} className="addEmployee">
          <AddEmployeeModal {...this.state} />
        </Col>
        <Col xsHidden sm={4}>
          {this.state.verified!='true'?<p style={{marginTop:'5%'}}>Add employee is disabled until an admin reviews and accepts your company</p>:null}
        </Col>
        <Col xsHidden sm={4} className="addLocation">
          <AddLocationModal companyName={this.props.uid} {...this.state}/>
        </Col>
      </div>
    );
  }
}

export default BottomBar;
