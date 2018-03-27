import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Clean.css';

class Clean extends Component {
  render() {
    let labels =["1 not often", "2", '3', '4', '5 very often']
    let items = []
    for (let i = 1; i <= 5; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }
    
    return (
      <div>
        <Col xs={6}>
          <Col xs={8}>How often will you have guests over?</Col>
          <Col xs={4}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.youBringGuestChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      </div>
    );
  }
}

export default Clean;