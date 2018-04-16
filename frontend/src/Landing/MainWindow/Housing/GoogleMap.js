import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react'

//import './GoogleMap.css';

export class GoogleMap extends Component {
  render() {
    return (
      <Map google={this.props.google} zoom={14} style={{ width: '300px', height: '300px' }} initialCenter={{ lat: this.props.lat, lng: this.props.lng }}>
        <Marker
          title={this.props.address}
          position={{ lat: this.props.lat, lng: this.props.lng }}
        />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDCc_iTN4KNj7Fr3yNI7gCHSzDG8AyWQ0Q'
})(GoogleMap)
