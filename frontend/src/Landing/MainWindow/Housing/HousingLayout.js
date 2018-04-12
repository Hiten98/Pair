import React, { Component } from 'react';
import {NavLink, Switch, Route} from 'react-router-dom'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
//import './LandingScreen.css';

class LandingScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minBed: 5,
      maxBed: 5,
      minBath: 5,
      maxBath: 5,
      minPrice: 2500,
      maxPrice: 2500,
      minSqFt: 2500,
      maxSqFt: 2500,
      bedOpen: false,
      bathOpen: false,
      priceOpen: false,
      sqFtOpen: false
    }
  }

  bedOpen = () => {
    this.setState({bedOpen: true});
  };

  bedClose = () => {
    this.setState({bedOpen: false});
  };

  minBedSlider = (event, value) => {
    this.setState({minBed: value});
  };

  maxBedSlider = (event, value) => {
    this.setState({maxBed: value});
  };

  bathOpen = () => {
    this.setState({bathOpen: true});
  };

  bathClose = () => {
    this.setState({bathOpen: false});
  };

  minBathSlider = (event, value) => {
    this.setState({minBath: value});
  };

  maxBathSlider = (event, value) => {
    this.setState({maxBath: value});
  };

  priceOpen = () => {
    this.setState({priceOpen: true});
  };

  priceClose = () => {
    this.setState({priceOpen: false});
  };

  minPriceSlider = (event, value) => {
    this.setState({minPrice: value});
  };

  maxPriceSlider = (event, value) => {
    this.setState({maxPrice: value});
  };

  sqFtOpen = () => {
    this.setState({sqFtOpen: true});
  };

  sqFtClose = () => {
    this.setState({sqFtOpen: false});
  };

  minSqFtSlider = (event, value) => {
    this.setState({minSqFt: value});
  };

  maxSqFtSlider = (event, value) => {
    this.setState({maxSqFt: value});
  };

  render() {
    const bedActions = [
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.bedClose}/>,
    ];
    const bathActions = [
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.bathClose}/>,
    ];
    const priceActions = [
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.priceClose}/>,
    ];
    const sqFtActions = [
      <FlatButton label="OK" primary={true} keyboardFocused={true} onClick={this.sqFtClose}/>,
    ];

    return (
      <div>

        <RaisedButton label="Choose number of Beds" onClick={this.bedOpen} />
        <Dialog actions={bedActions} modal={false} open={this.state.bedOpen} onRequestClose={this.bedClose}>
          <p>
            <span>{'Minimum Number of Beds: '}</span>
            <span>{this.state.minBed}</span>
          </p>
          <Slider min={0} max={10} step={1} value={this.state.minBed} onChange={this.minBedSlider} />
          <p>
            <span>{'Maximum number of Beds: '}</span>
            <span>{this.state.maxBed}</span>
          </p>
          <Slider min={0} max={10} step={1} value={this.state.maxBed} onChange={this.maxBedSlider}
          />
        </Dialog>

        <RaisedButton label="Choose number of Baths" onClick={this.bathOpen} />
        <Dialog actions={bathActions} modal={false} open={this.state.bathOpen} onRequestClose={this.bathClose}>
          <p>
            <span>{'Minimum Number of Baths: '}</span>
            <span>{this.state.minBath}</span>
          </p>
          <Slider min={0} max={10} step={1} value={this.state.minBath} onChange={this.minBathSlider} />
          <p>
            <span>{'Maximum number of Baths: '}</span>
            <span>{this.state.maxBath}</span>
          </p>
          <Slider min={0} max={10} step={1} value={this.state.maxBath} onChange={this.maxBathSlider}
          />
        </Dialog>

        <RaisedButton label="Choose Price Range" onClick={this.priceOpen} />
        <Dialog actions={priceActions} modal={false} open={this.state.priceOpen} onRequestClose={this.priceClose}>
          <p>
            <span>{'Minimum Price: '}</span>
            <span>{this.state.minPrice}</span>
          </p>
          <Slider min={0} max={5000} step={100} value={this.state.minPrice} onChange={this.minPriceSlider} />
          <p>
            <span>{'Maximum Price: '}</span>
            <span>{this.state.maxPrice}</span>
          </p>
          <Slider min={0} max={5000} step={100} value={this.state.maxPrice} onChange={this.maxPriceSlider}
          />
        </Dialog>

        <RaisedButton label="Choose Square Feet" onClick={this.sqFtOpen} />
        <Dialog actions={sqFtActions} modal={false} open={this.state.sqFtOpen} onRequestClose={this.sqFtClose}>
          <p>
            <span>{'Minimum Square Feet: '}</span>
            <span>{this.state.minSqFt}</span>
          </p>
          <Slider min={0} max={5000} step={100} value={this.state.minSqFt} onChange={this.minSqFtSlider} />
          <p>
            <span>{'Maximum Square Feet: '}</span>
            <span>{this.state.maxSqFt}</span>
          </p>
          <Slider min={0} max={5000} step={100} value={this.state.maxSqFt} onChange={this.maxSqFtSlider}
          />
        </Dialog>

      </div>
    );
  }
}

export default LandingScreen;
