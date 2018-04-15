import React, { Component } from 'react';
import { RaisedButton, Dialog, Slider, FlatButton, } from 'material-ui';
import { Row } from 'react-bootstrap';
import axios from 'axios';
//import './FilterHouses.css';

class FilterHouses extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minBed: 0,
      maxBed: 10,
      minBath: 0,
      maxBath: 10,
      minPrice: 0,
      maxPrice: 10000,
      minSqFt: 0,
      maxSqFt: 5000,
      open: false,
      offset: 0,
      temp: false,
    }
  }

  showSuggestedHousing = () => {
    //console.log(this.state.desiredPrice);
    //console.log(this.state.desiredRoommate);
    // Since Pricing ranges from 0 - 7 and 0 - 10,000, I am using increments of 1250
    this.setState({
      maxPrice: +this.props.desiredPrice * 1250 + 1250,
      minPrice: +this.props.desiredPrice * 1250,
      maxBath: +this.props.desiredRoommate + 1,
      minBath: +this.props.desiredRoommate - 1,
      maxBed: +this.props.desiredRoommate + 1,
      minBed: +this.props.desiredRoommate - 1
    },
      () => {
        let sendBack = {
          minBed: this.state.minBed,
          maxBed: this.state.maxBed,
          minBath: this.state.minBath,
          maxBath: this.state.maxBath,
          minPrice: this.state.minPrice,
          maxPrice: this.state.maxPrice,
          minSqFt: this.state.minSqFt,
          maxSqFt: this.state.maxSqFt,
        }
        this.handleClose();
        this.props.handleSearch(sendBack);
      });
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  minBedSlider = (event, value) => {
    this.setState({ minBed: value });
  };

  maxBedSlider = (event, value) => {
    this.setState({ maxBed: value });
  };

  minBathSlider = (event, value) => {
    this.setState({ minBath: value });
  };

  maxBathSlider = (event, value) => {
    this.setState({ maxBath: value });
  };

  minPriceSlider = (event, value) => {
    this.setState({ minPrice: value });
  };

  maxPriceSlider = (event, value) => {
    this.setState({ maxPrice: value });
  };

  minSqFtSlider = (event, value) => {
    this.setState({ minSqFt: value });
  };

  maxSqFtSlider = (event, value) => {
    this.setState({ maxSqFt: value });
  };

  render() {
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Apply Filters"
        primary={true}
        onClick={() => {
          let sendBack = {
            minBed: this.state.minBed,
            maxBed: this.state.maxBed,
            minBath: this.state.minBath,
            maxBath: this.state.maxBath,
            minPrice: this.state.minPrice,
            maxPrice: this.state.maxPrice,
            minSqFt: this.state.minSqFt,
            maxSqFt: this.state.maxSqFt,
          }
          this.handleClose();
          this.props.handleSearch(sendBack);
        }}
      />
    ];
    return (
      <div>
        <RaisedButton label="Filters" onClick={this.handleOpen} />
        <RaisedButton
          label="Show Suggested Housing"
          onClick={this.showSuggestedHousing}
        />
        <Dialog
          actions={actions}
          autoScrollBodyContent
          modal={true}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <div style={{ overflowY: "auto", overflowX: "hidden" }}>
            <p>Minimum Number of Beds:&nbsp;{this.state.minBed}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.minBed}
              onChange={this.minBedSlider}
            />

            <p>Maximum number of Beds:&nbsp;{this.state.maxBed}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.maxBed}
              onChange={this.maxBedSlider}
            />

            <p>Minimum Number of Baths:&nbsp;{this.state.minBath}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.minBath}
              onChange={this.minBathSlider}
            />

            <p>Maximum number of Baths:&nbsp;{this.state.maxBath}</p>
            <Slider
              min={0}
              max={10}
              step={1}
              value={this.state.maxBath}
              onChange={this.maxBathSlider}
            />

            <p>Minimum Price:&nbsp;{this.state.minPrice}</p>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={this.state.minPrice}
              onChange={this.minPriceSlider}
            />

            <p>Maximum Price:&nbsp;{this.state.maxPrice}</p>
            <Slider
              min={0}
              max={10000}
              step={100}
              value={this.state.maxPrice}
              onChange={this.maxPriceSlider}
            />

            <p>Minimum Square Feet:&nbsp;{this.state.minSqFt}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.minSqFt}
              onChange={this.minSqFtSlider}
            />

            <p>Maximum Square Feet:&nbsp;{this.state.maxSqFt}</p>
            <Slider
              min={0}
              max={5000}
              step={100}
              value={this.state.maxSqFt}
              onChange={this.maxSqFtSlider}
            />
          </div>
        </Dialog>
      </div>
    );
  }
}

export default FilterHouses;
