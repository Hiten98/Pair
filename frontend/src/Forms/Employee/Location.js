import React, { Component } from 'react';
import { Col } from 'react-bootstrap'
import { DropDownMenu, MenuItem } from 'material-ui'
import history from '../../history'
import './Location.css';

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      locations: [],
      items: [],
      prevValue: 0,
    }
  }

  change = (event, index, value) => {
    this.props.change(event.target.textContent)
    this.setState({ prevValue: value })
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.locations != this.props.locations)
      this.componentDidMount()
  }

  componentDidMount = () => {
    let items = []
    // console.log(this.props.locations)
    items.push(<MenuItem value={0} key={0} primaryText='Choose a location' />)
    for (let i in this.props.locations) {
      items.push(<MenuItem value={parseInt(i) + 1} key={parseInt(i) + 1} primaryText={this.props.locations[i]} />)
      if (this.props.locations[i] == this.props.dv) {
        this.setState({ prevValue: parseInt(i) + 1 })
      }
      this.setState({ items: items })
    }
  }

  render() {
    // console.log(this.props.dv)
    return (
      <div>
        <Col xs={6} className='location-question'>
          <br />
          <span className='location-question'>Choose the location that you want to moderate</span>
        </Col>
        <Col xs={6}>
          <DropDownMenu
            maxHeight={250}
            value={this.state.prevValue}
            onChange={this.change}
          >
            {this.state.items}
          </DropDownMenu>
        </Col>
      </div>
    );
  }
}

export default Location;