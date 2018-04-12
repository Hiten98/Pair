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
      minBath: null,
      maxBath: null,
      minPrice: null,
      maxPrice: null,
      minSqFt: null,
      maxSqFt: null,
      bedOpen: false
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

  render() {
    const bedActions = [
      <FlatButton label="Ok" primary={true} keyboardFocused={true} onClick={this.bedClose}/>,
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

      </div>
    );
  }
}

export default LandingScreen;
