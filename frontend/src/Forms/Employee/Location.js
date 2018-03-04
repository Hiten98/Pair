import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
import './Location.css';

class Location extends Component {
  render() {
    let items = []
    let labels = ["Choose a location"]
    for (let i = 0; i < this.props.locations.length; i++) {
      labels.push(this.props.locations[i])
    }
    
    for (let i = 0; i < labels.length; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i]} />)
    }

    return (
      <div>
        <Col xs={6} className='location-question'>
          <br />
          <span className='location-question'>Choose the location that you want to moderate</span>
        </Col>
        <Col xs={6}>
          <DropDownMenu
            maxHeight={250}
            value={this.props.dv}
            onChange={this.props.change}
          >
            {items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default Location;