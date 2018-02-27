import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { DropDownMenu, MenuItem } from 'material-ui'
import { Grid, Row, Col, Image } from 'react-bootstrap'
//import './LandingScreen.css';

class ThemGuestInput extends Component {
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
    let labels = ["Yes", 'No']
    let items = []
    for (let i = 1; i <= 2; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <div>
        <Col xs={8}>Is it okay if your roommate has a pet?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange}>
            {items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default ThemGuestInput;