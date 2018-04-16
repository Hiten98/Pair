import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom'
import GoogleMap from './GoogleMap'
import { RaisedButton } from 'material-ui';


//To make this work, the address must be passed in as a prop called address
//It's parent should put this alongside a button that says show map to reduce number of api calls

class MapButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: '',
      lng: '',
      address: '',
      item: false,
    }
  }

  componentDidMount = () => {
    let that = this
    let geocodeApiKey = 'AIzaSyDCc_iTN4KNj7Fr3yNI7gCHSzDG8AyWQ0Q'
    let startAddress = this.props.address
    let tempAddress = startAddress.split(' ').join('+')
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${tempAddress}&key=${geocodeApiKey}`)
      .then(response => response.json())
      .then(data => {
        // console.log(data.results[0])
        that.setState({ lat: data.results[0].geometry.location.lat, lng: data.results[0].geometry.location.lng })
      })
  }

  returnMap = () => {
    this.setState({ item: true })
  }

  render() {
    return (
      <GoogleMap {...this.state} {...this.props} />
    )
  }
}

export default MapButton