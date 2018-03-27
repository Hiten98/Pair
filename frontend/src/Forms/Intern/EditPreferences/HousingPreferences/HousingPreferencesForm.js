import React, { Component } from 'react';
import {Row} from 'react-bootstrap'
import Price from '../../UserPreferences/HousingPreferences/Price'
import Distance from '../../UserPreferences/HousingPreferences/Distance'
import Duration from '../../UserPreferences/HousingPreferences/Duration'
import Roommates from '../../UserPreferences/HousingPreferences/Roommates'
import HousingSubmitButtons from './HousingSubmitButtons'
import axios from 'axios'
//import './HousingPreferencesForm.css';

axios.defaults.baseURL = "https://glacial-spire-77473.herokuapp.com/";

class HousingPreferencesForm extends Component {
  constructor(props){
    super(props)
    this.state={
      price:1,
      roommates:1,
      distance:1,
      duration:1,
      change:false,
    }

    try {
      const serializedState = localStorage.getItem('housing-preferences')
      if (serializedState !== null) {
        this.state = JSON.parse(serializedState)
        //console.log(this.state)
      }
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  saveState = () => {
    try {
      const serializedState = JSON.stringify(this.state)
      localStorage.setItem('housing-preferences', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  componentDidMount(){
    let that = this
    //KUNAL PUT CODE HERE to get preferences from server
    //put them in the nulls that are below
    axios.post('/GET-PREFERENCES/HOUSING-PREFERENCES', {
      "userID": this.props.uid
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        if (!that.state.change)
          that.setState({
            price: response.data.desiredPrice,
            roommates: response.data.desiredRoomate,
            distance: response.data.desiredDistance,
            duration: response.data.desiredDuration,
          })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  priceChange=(event,index,value)=>{
    this.setState({price:value})
    this.changeChanged(true)
  }

  distanceChange=(event,index,value)=>{
    this.setState({distance:value})
    this.changeChanged(true)
  }

  durationChange=(event,index,value)=>{
    this.setState({duration:value})
    this.changeChanged(true)
  }

  roommatesChange=(event,index,value)=>{
    this.setState({roommates:value})
    this.changeChanged(true)
  }

  changeChanged=(i)=>{
    this.setState({change:i},()=>{this.saveState()})
    this.props.changeChanged(i)
  }

  render() {
    return (
      <div>
        <hr/>
        <Row>
          <Price dv={this.state.price} priceChange={this.priceChange}/>

          <Distance dv={this.state.distance} distanceChange={this.distanceChange}/>
        </Row>
        <hr/>
        <Row>
          <Duration dv={this.state.duration} durationChange={this.durationChange}/>

          <Roommates dv={this.state.roommates} roommatesChange={this.roommatesChange}/>
        </Row>
        <hr/>
        <HousingSubmitButtons {...this.state} changePage={this.props.changePage} completed={this.props.completed} uid={this.props.uid} changeChange={this.props.changeChanged}/>
      </div>
    );
  }
}

export default HousingPreferencesForm;