import React, { Component } from 'react';
import {Row} from 'react-bootstrap'
import Price from './Price'
import Distance from './Distance'
import Duration from './Duration'
import Roommates from './Roommates'
import HousingSubmitButtons from './HousingSubmitButtons'
import axios from 'axios'
//import './HousingPreferencesForm.css';

axios.defaults.baseURL = 'http://localhost:9090'

class HousingPreferencesForm extends Component {
  constructor(props){
    super(props)
    this.state={
      price:1,
      roommates:1,
      distance:1,
      duration:1,
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
        if (response.data.desiredPrice != null)
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
    this.props.changeChanged(true)
  }

  distanceChange=(event,index,value)=>{
    this.setState({distance:value})
    this.props.changeChanged(true)
  }

  durationChange=(event,index,value)=>{
    this.setState({duration:value})
    this.props.changeChanged(true)
  }

  roommatesChange=(event,index,value)=>{
    this.setState({roommates:value})
    this.props.changeChanged(true)
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
        <HousingSubmitButtons {...this.state} changePage={this.props.changePage}/>
      </div>
    );
  }
}

export default HousingPreferencesForm;