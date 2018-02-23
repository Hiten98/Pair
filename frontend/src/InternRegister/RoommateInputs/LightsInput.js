import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { DropDownMenu, MenuItem } from 'material-ui'
import { Grid, Row, Col, Image } from 'react-bootstrap'
//import './LandingScreen.css';

class LightsInput extends Component {
  state = {
    value: 3
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
    let labels = ["1 not important", "2", '3', '4', '5 very impotant']
    let items = []
    for (let i = 1; i <= 5; i++) {
      items.push(<MenuItem value={i} key={i} primaryText={labels[i - 1]} />)
    }
    return (
      <div>
        <Col xs={8}>How clean do you like to be?</Col>
        <Col xs={4}>
          <DropDownMenu maxHeight={250} value={this.state.value} onChange={this.handleChange}>
            {items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default LightsInput;