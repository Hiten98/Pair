import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Roommates.css';

class Roommates extends Component {

  render() {
    let labels = ['0', '1', '2', '3', '4', '5+']
    let items = []
    for (let i = 1; i <= 6; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <Col xs={6}>
        <Col xs={8}>How many roommates would you like to have?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.roommatesChange}>
            {items}
          </DropDownMenu>
        </Col>
      </Col>
    );
  }
}

export default Roommates;