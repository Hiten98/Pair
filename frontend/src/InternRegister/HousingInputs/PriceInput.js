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
    let labels = ['0-249', '250-499', '500-749', '750-999', '1000-1249', '1250-1499', '1500+']
    let items = []
    for (let i = 1; i <= 7; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <div>
        <Col xs={8}>What is your preferred price range? (In price per person)</Col>
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