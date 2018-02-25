import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { DropDownMenu, MenuItem } from 'material-ui'
import { Grid, Row, Col, Image } from 'react-bootstrap'
//import './LandingScreen.css';

class BedtimeInput extends Component {
  state = {
    value: 21
  }

  componentWillMount() {
    this.setState({ value: this.props.div })
  }

  handleChange = (event, index, value) => {
    this.setState({ value })
    this.props.changing(value)
  }

  render() {
    let items = []
    for (let i = 1; i <= 12; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={`${i} AM`} />)
    }
    for (let i = 13; i <= 24; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={`${i - 12} PM`} />)
    }

    return (
      <div>
        <Col xs={8}>What time do you like to go to bed?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange}>
            {items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default BedtimeInput;