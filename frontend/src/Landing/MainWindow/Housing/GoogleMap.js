import React, { Component } from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react'

//import './GoogleMap.css';

export class GoogleMap extends Component {
  render() {
    // console.log(this.props.lng)
    if (this.props.lng != '') {
      return (
        <Map google={this.props.google} zoom={14} style={{ width: '92.5%', height: '200px', position: 'relative' }} initialCenter={{ lat: this.props.lat, lng: this.props.lng }}>
          <Marker
            title={this.props.address}
            position={{ lat: this.props.lat, lng: this.props.lng }}
          />
        </Map>
      );
    } else
      return null;
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDCc_iTN4KNj7Fr3yNI7gCHSzDG8AyWQ0Q'
})(GoogleMap)
