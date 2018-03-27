import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Clean.css';

class Clean extends Component {
  render() {
    let labels = ["Yes", 'No']
    let items = []
    for (let i = 1; i <= 2; i++) {
      items.push(<MenuItem value={`${i}`} key={i} primaryText={labels[i - 1]} />)
    }
    
    return (
      <div>
        <Col xs={6}>
          <Col xs={8}>Will you be bringing a pet?</Col>
          <Col xs={4}>
            <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.youBringPetChange}>
              {items}
            </DropDownMenu>
          </Col>
        </Col>
      </div>
    );
  }
}

export default Clean;