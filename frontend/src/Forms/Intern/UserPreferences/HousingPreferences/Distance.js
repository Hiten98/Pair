import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Distance.css';

class Distance extends Component {

  render() {
    let labels = ['< 0.5 mi', '0.5 - 1 mi', '1 - 2 mi', '2 - 4 mi', '4 - 6 mi', '6 - 10 mi', '10+ mi']
    let items = []
    for (let i = 1; i <= 7; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <Col xs={6}>
        <Col xs={8}>What is your preferred distance from your work's campus?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.distanceChange}>
            {items}
          </DropDownMenu>
        </Col>
      </Col>
    );
  }
}

export default Distance;