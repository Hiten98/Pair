import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Grid, Row, Col, Image } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
//import './LandingScreen.css';

class PriceInput extends Component {
  state = {
    value: 1
  }

  componentWillMount() {
    if (this.props.dv != null)
      this.setState({ value: this.props.div })
  }

  handleChange = (event, index, value) => {
    this.setState({ value })
    this.props.changing(value)
  }

  render() {
    let labels = ['0', '1', '2', '3', '4', '5+']
    let items = []
    for (let i = 1; i <= 6; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <div>
        <Col xs={8}>How many roommates would you like to have?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange}>
            {items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default PriceInput;