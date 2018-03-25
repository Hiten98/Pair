import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import {Row,Col} from 'react-bootstrap'
//import './CompanyInformation.css';

class CompanyInformation extends Component {
  render() {
    return (
      <Row className='row-div company-info'>
        <Col xs={6}>
          <h3>Company:</h3>
          <p> {this.props.company}</p>
        </Col>
        <Col xs={6}>
          <h3>Location:</h3>
          <p> {this.props.location}</p>
        </Col>
      </Row>
    );
  }
}

export default CompanyInformation;