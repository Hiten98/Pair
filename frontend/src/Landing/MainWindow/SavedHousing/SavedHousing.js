import React, { Component } from "react";
import { NavLink, Switch, Route } from "react-router-dom";
import {
  MenuItem,
  DropDownMenu,
  Paper,
  ListItem,
  Avatar,
  List
} from "material-ui";
import { Row, Col } from "react-bootstrap";
import ReactDOM from "react-dom";
import Slider, { Range } from "rc-slider";
import "rc-slider/assets/index.css";

class SavedHousing extends Component {
  constructor(props) {
    super(props);

    const list = [];
    for (let i = 1; i < 10; i++) {
      list.push(<MenuItem value={i} key={i} primaryText={i} />);
    }
    const distList = [];
    distList.push(<MenuItem value={5} key={5} primaryText="5 Miles" />);
    distList.push(<MenuItem value={10} key={10} primaryText="10 Miles" />);
    distList.push(<MenuItem value={15} key={15} primaryText="15 Miles" />);
    distList.push(<MenuItem value={20} key={20} primaryText="20 Miles" />);
    distList.push(<MenuItem value={25} key={25} primaryText="25 Miles" />);
    distList.push(<MenuItem value={30} key={30} primaryText="30 Miles" />);
    distList.push(<MenuItem value={35} key={35} primaryText="35 Miles" />);

    this.state = {
      guestValue: 1,
      bedroomValue: 1,
      bathroomValue: 1,
      maxDistanceValue: 5,
      dropdownList: list,
      distanceList: distList,
      priceLow: 0,
      priceHigh: 1000
    };
  }

  handleGuestChange = (event, index, value) => {
    this.setState({ guestValue: value });
  };
  handleBedroomChange = (event, index, value) => {
    this.setState({ bedroomValue: value });
  };
  handleBathroomChange = (event, index, value) => {
    this.setState({ bathroomValue: value });
  };
  handleMaxDistanceChange = (event, index, value) => {
    this.setState({ maxDistanceValue: value });
  };

  log = (value) => {
    this.setState({
        priceLow: value[0]*100/2,
        priceHigh: value[1]*100/2
    })
  }

  render() {
    return (
      <div>
        <Row>
          <h3>Saved Houses</h3>
        </Row>
        <Row style={{marginLeft: "2vw", textAlign: "left"}}>
          <Col xs={4}>
            <Row>
              Guests
              <DropDownMenu
                value={this.state.guestValue}
                onChange={this.handleGuestChange}
              >
                {this.state.dropdownList}
              </DropDownMenu>
            </Row>
            <Row>
              Bedrooms
              <DropDownMenu
                value={this.state.bedroomValue}
                onChange={this.handleBedroomChange}
              >
                {this.state.dropdownList}
              </DropDownMenu>
            </Row>
            <Row>
              Bathrooms
              <DropDownMenu
                value={this.state.bathroomValue}
                onChange={this.handleBathroomChange}
              >
                {this.state.dropdownList}
              </DropDownMenu>
            </Row>
            <Row>
              Monthly Price<br/>
              {this.state.priceLow}<Range style={{marginLeft:"2vw", width:"10vw"}} allowCross={false} defaultValue={[0, 10]} onChange={this.log} />{this.state.priceHigh}
            </Row>
            <Row>Location</Row>
            <Row>
              Max Distance
              <DropDownMenu
                value={this.state.maxDistanceValue}
                onChange={this.handleMaxDistanceChange}
              >
                {this.state.distanceList}
              </DropDownMenu>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SavedHousing;
