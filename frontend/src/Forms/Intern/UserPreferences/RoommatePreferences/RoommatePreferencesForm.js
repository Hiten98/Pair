import React, { Component } from 'react'
import axios from 'axios'
import {Row} from 'react-bootstrap'
import Bedtime from './Bedtime'
import Waketime from './Waketime'
import Lights from './Lights'
import Clean from './Clean'
import Sharing from './Sharing'
import Smoke from './Smoke'
import YouBringGuest from './YouBringGuest'
import ThemBringGuest from './ThemBringGuest'
import YouBringPet from './YouBringPet'
import ThemBringPet from './ThemBringPet'
import RoommateSubmitButtons from './RoommateSubmitButtons'
//import './RoommatePreferencesForm.css'

axios.defaults.baseURL='http://https://glacial-spire-77473.herokuapp.com/'

//NEEDS TESTING

class RoommatePreferencesForm extends Component{
  constructor(props){
    super(props)
    this.state={
      bedtime:'21',
      waketime:'9',
      lights:'3',
      clean:'3',
      sharing:'3',
      smoke:'2',
      youBringGuest:'3',
      themBringGuest:'1',
      youBringPet:'1',
      themBringPet:'1',
      change:false,
    }

    try {
      const serializedState = localStorage.getItem('roommate-preferences')
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
      localStorage.setItem('roommate-preferences', serializedState)
    } catch (err) {
      console.log('This browser does not allow localstorage and some functionalities may be impacted')
    }
  }

  componentDidMount(){
    let that = this
    axios.post('/GET-PREFERENCES/ROOMMATE-PREFERENCES', {
      "userID": this.props.uid
    }).then(function (response) {
      if (response.data.status == false) {
        console.log("Something went wrong :(")
      } else {
        if(response.data.youguest=='undefined'){

        } else if (!that.state.change)
          that.setState({
            youBringGuest: response.data.youguest,
            themBringGuest: response.data.themguest,
            youBringPet: response.data.youpet,
            themBringPet: response.data.thempet,
            sharing: response.data.sharing,
            smoke: response.data.smoke,
            bedtime: response.data.bedtime,
            waketime: response.data.waketime,
            lights: response.data.lights,
            clean: response.data.clean,
          })
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  bedtimeChange=(event,index,value)=>{
    this.setState({bedtime:value})
    this.changeChanged(true)
  }

  waketimeChange=(event,index,value)=>{
    this.setState({waketime:value})
    this.changeChanged(true)
  }

  lightsChange=(event,index,value)=>{
    this.setState({lights:value})
    this.changeChanged(true)
  }

  cleanChange=(event,index,value)=>{
    this.setState({clean:value})
    this.changeChanged(true)
  }

  sharingChange=(event,index,value)=>{
    this.setState({sharing:value})
    this.changeChanged(true)
  }

  smokeChange=(event,index,value)=>{
    this.setState({smoke:value})
    this.changeChanged(true)
  }

  youBringGuestChange=(event,index,value)=>{
    this.setState({youBringGuest:value})
    this.changeChanged(true)
  }

  themBringGuestChange=(event,index,value)=>{
    this.setState({themBringGuest:value})
    this.changeChanged(true)
  }

  youBringPetChange=(event,index,value)=>{
    this.setState({youBringPet:value})
    this.changeChanged(true)
  }

  themBringPetChange=(event,index,value)=>{
    this.setState({themBringPet:value})
    this.changeChanged(true)
  }

  changeChanged=(i)=>{
    this.setState({change:i},()=>{this.saveState()})
    this.props.changeChanged(i)
  }

  render(){
    return (
      <div className='preferences-container'>
        <hr/>
        <Row>
          <Bedtime dv={this.state.bedtime} bedtimeChange={this.bedtimeChange}/>

          <Waketime dv={this.state.waketime} waketimeChange={this.waketimeChange}/>
        </Row>
        <hr />
        <Row>
          <Lights dv={this.state.lights} lightsChange={this.lightsChange}/>

          <Clean dv={this.state.clean} cleanChange={this.cleanChange}/>
        </Row>
        <hr />
        <Row>
          <Sharing dv={this.state.sharing} sharingChange={this.sharingChange}/>

          <Smoke dv={this.state.smoke} smokeChange={this.smokeChange}/>
        </Row>
        <hr />
        <Row>
          <YouBringGuest dv={this.state.youBringGuest} youBringGuestChange={this.youBringGuestChange}/>

          <ThemBringGuest dv={this.state.themBringGuest} themBringGuestChange={this.themBringGuestChange}/>
        </Row>
        <hr />
        <Row>
          <YouBringPet dv={this.state.youBringPet} youBringPetChange={this.youBringPetChange}/>

          <ThemBringPet dv={this.state.themBringPet} themBringPetChange={this.themBringPetChange}/>
        </Row>
        <hr />
        <RoommateSubmitButtons {...this.state} uid={this.props.uid} changePage={this.props.changePage} changeChange={this.changeChanged} changeCompleted={this.props.changeCompleted}/>
      </div>
    )
  }
}

export default RoommatePreferencesForm