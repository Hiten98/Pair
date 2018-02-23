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
    let labels = ['< 0.5 mi', '0.5 - 1 mi', '1 - 2 mi', '2 - 4 mi', '4 - 6 mi', '6 - 10 mi', '10+ mi']
    let items = []
    for (let i = 1; i <= 7; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <div>
        <Col xs={8}>What is your preferred distance from your work's campus?</Col>
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