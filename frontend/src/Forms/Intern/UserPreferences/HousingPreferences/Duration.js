import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Duration.css';

class Duration extends Component {

  render() {
    let labels = ['May - August','June - September']
    let items = []
    for (let i = 1; i <= 2; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <Col xs={6}>
        <Col xs={8}>How long will you be needing a place to live?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.durationChange}>
            {items}
          </DropDownMenu>
        </Col>
      </Col>
    );
  }
}

export default Duration;