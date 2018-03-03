import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './Price.css';

class Price extends Component {

  render() {
    let labels = ['0-249', '250-499', '500-749', '750-999', '1000-1249', '1250-1499', '1500+']
    let items = []
    for (let i = 1; i <= 7; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <Col xs={6}>
        <Col xs={8}>What is your preferred price range? (In price per person)</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.props.dv} onChange={this.props.priceChange}>
            {items}
          </DropDownMenu>
        </Col>
      </Col>
    );
  }
}

export default Price;